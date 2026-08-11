import React, { useEffect, useMemo, useState } from "react";


import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import { FaArrowLeft, FaCalendarAlt, FaFileAlt, FaMapMarkerAlt, FaUser, FaUserTie } from "react-icons/fa";
import styled from "styled-components";
import { FaPenToSquare } from "react-icons/fa6";
import { buildOwnershipMap, DateForApiFormate, formatRetainerActivities, generateDatesBetween, getMonthRange, useDateWiseAssignments } from "../../../pages/ProjectManagement/utils/utils";
import { getContractAllocationData, getEmpAllocationData, getemployeeLists } from "../../../services/productServices";
import CurrentAssignments from "./CurrentAssignResourceList copy";
import ConfirmPopup from "../ConfirmPopup";
import Card from "../../Card";
import Layout from "../../Layout";
import Button from "../../Button";

const Tagline = styled.p`
 color: ${({ theme }) => theme.colors.textLight};
`

const ClaimsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.5rem;
  }
`;


const InfoStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1rem;
`;

const InfoPill = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: ${({ theme }) => theme.colors?.backgroundAlt || "#f4f4f6"};
  border-radius: 20px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors?.text || "#333"};

  span {
    font-weight: 600;
    color: ${({ theme }) => theme.colors?.textLight || "#777"};
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem 1.5rem;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
`;

const DetailIconWrap = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || "#f1f0fe"};
  color: ${({ theme }) => theme.colors?.primary || "#6C5CE7"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const DetailText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const DetailLabel = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.textLight || "#999"};
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || "#333"};
`;


const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

const ResourceAllocation = () => {
  const location = useLocation();
  const prevActivityData = location.state?.data;
  const [activityData, setActivityData] = useState(location.state?.data);
  const resourcePlannedList = location.state?.resourcePlannedList;
  const tabMode = location.state?.tabMode;
  const partnerActiveTab = location.state?.partnerActiveTab;
  const cpId = location.state?.cp_id || prevActivityData.emp_id;

  const { start, end } = getMonthRange();

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [originalAllocations, setOriginalAllocations] = useState([]);
  const [workingAllocations, setWorkingAllocations] = useState([]);
  const [busyAllocations, setBusyAllocations] = useState([]);

  const activityStart = activityData?.original_P?.start_date || activityData?.planned_start_date || "";
  const activityEnd = activityData?.original_P?.end_date || activityData?.planned_end_date || "";


  const isLocked = (row) => row.is_approved || !!activityData?.allAEntries?.length;

  const ownershipMap = useMemo(() => buildOwnershipMap(originalAllocations), [originalAllocations]);

  const originalById = useMemo(() => {
    const map = {};
    originalAllocations.forEach((r) => { map[r.id] = r; });
    return map;
  }, [originalAllocations]);

  const { dayWindow, dateWiseAssignments } = useDateWiseAssignments({ activityStart, activityEnd, allocations: workingAllocations, originalById });
  // ---- Derived data — ALL computed from workingAllocations, nothing else ----

  const employeeDateMap = useMemo(() => {
    const map = {};
    workingAllocations.forEach((row) => {
      if (!map[row.emp_id]) map[row.emp_id] = {};
      generateDatesBetween(row.start_date, row.end_date).forEach((d) => {
        map[row.emp_id][d] = row.rowKey;
      });
    });
    return map;
  }, [workingAllocations]);

  const busyDateMap = useMemo(() => {
    const map = {};
    busyAllocations.forEach((row) => {
      if (!map[row.emp_id]) map[row.emp_id] = {};
      generateDatesBetween(row.start_date, row.end_date).forEach((date) => {
        if (!employeeDateMap[row.emp_id]?.[date]) {
          map[row.emp_id][date] = true;
        }
      });
    });
    return map;
  }, [busyAllocations, employeeDateMap]);

  // ---- Load ----

  useEffect(() => {
    fetchEmployees();
    loadAllData();
  }, []);

  const loadExisting = async (params = {}) => {
    if (!params) return [];
    try {
      const res = await getContractAllocationData(params);
      return (res?.data || []).map((item) => ({
        ...item,
        start_date: item.start_date
          ? DateForApiFormate(item.start_date, true)
          : item.s_date
            ? DateForApiFormate(item.s_date, true)
            : "",
        end_date: item.end_date
          ? DateForApiFormate(item.end_date, true)
          : item.e_date
            ? DateForApiFormate(item.e_date, true)
            : "",
      }));
    } catch {
      toast.error("Failed to load existing allocations");
      return [];
    }
  };

  const refreshActivityData = async () => {
    const p_id = activityData?.original_P?.id;
    if (!p_id) return;
    try {
      const payload = {
        emp_id: cpId,
        start_date: DateForApiFormate(start),
        end_date: DateForApiFormate(end),
      };
      const response = await getEmpAllocationData(payload);
      const formatted = formatRetainerActivities(response.data, resourcePlannedList);
      const fresh = formatted.find((a) => a?.original_P?.id === p_id);
      if (fresh) setActivityData(fresh);
    } catch (err) {
      console.error("Failed to refresh activity data:", err);
    }
  };

  const loadAllData = async () => {
    const { id: allocation_id } = activityData?.original_P || {};
    try {
      setLoading(true);
      const [currentAllocations, busyData] = await Promise.all([
        loadExisting({ allocation_id, start_date: DateForApiFormate(start), end_date: DateForApiFormate(end) }),
        loadExisting({ emp_id: cpId, start_date: DateForApiFormate(start), end_date: DateForApiFormate(end) }),
      ]);

      const normalized = currentAllocations.filter((item) => item.is_active === true);

      setOriginalAllocations(normalized);
      setWorkingAllocations(normalized.map((r) => ({ ...r, rowKey: `existing_${r.id}` })));

      setBusyAllocations(
        busyData.filter((x) => x.allocation_id !== activityData?.original_P?.id)
      );
      await refreshActivityData();
    } catch {
      toast.error("Failed to load allocation data");
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getemployeeLists({ rm_emp_id: cpId });
      setEmployees(res?.data?.filter((e) => e.is_verified) || []);
    } catch {
      toast.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  };


  const matchingRetainer = (activityData?.original_P?.retainer_list || []).find((r) => r.a_type === "P" && r.start_date === activityData?.original_P?.start_date && r.end_date === activityData?.original_P?.end_date,);

  const plannedTL = matchingRetainer?.tl_count || 0;
  const plannedEX = matchingRetainer?.ex_count || 0;
  const plannedTLRate = matchingRetainer?.tl_rate;
  const plannedEXRate = matchingRetainer?.ex_rate;

  return (
    <Layout title="Allocation Plan Overview">
      <ClaimsHeader>
        <Tagline>Track and manage your assigned audit tasks</Tagline>
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: "flex-end" }}>
          <Button size="md" onClick={() => window.history.back()}>
            <FaArrowLeft />Back
          </Button>
        </div>
      </ClaimsHeader>

      <Card title="Activity Details" hoverable={false}>
        <DetailsGrid>
          <DetailItem>
            <DetailIconWrap><FaCalendarAlt size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Duration</DetailLabel>
              <DetailValue>{formatDate(activityData.planned_start_date)} – {formatDate(activityData.planned_end_date)}</DetailValue>
            </DetailText>
          </DetailItem>

          <DetailItem>
            <DetailIconWrap><FaFileAlt size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Customer</DetailLabel>
              <DetailValue>{activityData.customer_name}</DetailValue>
            </DetailText>
          </DetailItem>

          <DetailItem>
            <DetailIconWrap><FaFileAlt size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Order Item</DetailLabel>
              <DetailValue>{activityData.order_item_key}</DetailValue>
            </DetailText>
          </DetailItem>

          <DetailItem>
            <DetailIconWrap><FaUserTie size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Required TL</DetailLabel>
              <DetailValue>{plannedTL ?? '—'}</DetailValue>
              {plannedTLRate && <DetailValue>{plannedTLRate ?? '—'}/per day</DetailValue>}
            </DetailText>
          </DetailItem>

          <DetailItem>
            <DetailIconWrap><FaUser size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Required EX</DetailLabel>
              <DetailValue>{plannedEX ?? '—'}</DetailValue>
              {plannedEXRate && <DetailValue>{plannedEXRate ?? '—'}/per day</DetailValue>}
            </DetailText>
          </DetailItem>

          <DetailItem>
            <DetailIconWrap><FaMapMarkerAlt size={13} /></DetailIconWrap>
            <DetailText>
              <DetailLabel>Location</DetailLabel>
              <DetailValue>{activityData.store_name || '—'}</DetailValue>
            </DetailText>
          </DetailItem>
        </DetailsGrid>
        {activityData.store_remarks && <DetailItem style={{ marginTop: "1rem" }}>
          <DetailIconWrap><FaPenToSquare size={13} /></DetailIconWrap>
          <DetailText>
            <DetailLabel>Remark</DetailLabel>
            <DetailValue>{activityData.store_remarks || '—'}</DetailValue>
          </DetailText>
        </DetailItem>}
      </Card>

      {/* <Card hoverable={false} style={{ marginTop: "1rem" }}> */}
      <CurrentAssignments
        dateWiseAssignments={dateWiseAssignments}
        dayWindow={dayWindow}
        editingId={editingId?.rowKey}
        // handleEditDate={handleEditDate}
        // handleDeleteDate={handleDeleteDate}
        // handleFieldChange={handleFieldChange}
        // handleConfirmUpdate={handleConfirmUpdate}
        // handleCancelEdit={handleCancelEdit}
        activityStart={activityStart}
        activityEnd={activityEnd}
        activityData={activityData}
        isActual={false}
        employees={employees}
        loadAllData={loadAllData}
        tabMode={tabMode}
        partnerActiveTab={partnerActiveTab}
        plannedTL={plannedTL}
        plannedEX={plannedEX}
        tlContractRate={plannedTLRate}
        exContractRate={plannedEXRate}
        loading={loading}
      />





      {/* </Card> */}

      <ConfirmPopup
        isOpen={showConfirmPopup}
        isLoading={isSubmitting}
        // onConfirm={handleSubmit}
        onClose={() => setShowConfirmPopup(false)}
        title="Confirm Resource Plan"
        message="Are you sure you want to save these resources in the plan?"
        confirmLabel="Yes, Save"
      />
    </Layout>
  );
};

export default ResourceAllocation;
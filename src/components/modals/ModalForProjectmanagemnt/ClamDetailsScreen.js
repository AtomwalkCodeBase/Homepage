import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaUser, FaFileInvoiceDollar, FaFileAlt, FaArrowLeft, FaCheck } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import { getEmpClaim, getemployeeLists, postClaimAction } from "../../../services/productServices";
import { DateForApiFormate, matchClaimsToActivity } from "../../../pages/ProjectManagement/utils/utils";
import Button from "../../Button";
import Card from "../../Card";
import DataTable, { Td } from "../../DataTable";
import ConfirmPopup from "../ConfirmPopup";
import Badge from "../../Badge";
import Layout from "../../Layout";


const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
};

const currency = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

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

const FileLink = styled.a`
  color: ${({ theme, disabled }) => disabled ? '#999' : (theme.colors?.primary || "#6C5CE7")};
  font-weight: ${({ disabled }) => disabled ? '400' : '600'};
  text-decoration: none;
  gap: 0.3rem;
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
  &:hover { 
    text-decoration: ${({ disabled }) => disabled ? 'none' : 'underline'}; 
  }
`;

const EmptyRow = styled.div`
  padding: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors?.textLight || "#999"};
`;

const RemarkField = styled.div`
  font-size: 0.75rem;
  max-width: 150px; /* Adjust this value as needed */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ClaimGrandTotalBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.85rem;
  align-items: center;
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors?.primary ? `${theme.colors.primary}12` : "#6C5CE712"};
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.primary || "#6C5CE7"};
`;

// ADD — styled-components for the grid layout
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
  background: #f1f0fe;
  color: #6C5CE7;
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
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const DetailValue = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
`;

const ClamDetailsScreen = () => {
  const location = useLocation();
  const activityData = location.state?.data;
  const cp_emp_id = activityData?.emp_id;
  const loggedEmpId = localStorage.getItem("empId");
  const ViewMode = activityData.mode;
  const [isLoading, setIsLoading] = useState(false);
  const [openSubmitAllModal, setOpenSubmitAllModal] = useState(false);
  const [selectedClaimItem, setSelectedClaimItem] = useState(null);
  const [approveType, setApproveType] = useState("APPROVE"); // "APPROVE" | "REJECT"
  const [approveRemarks, setApproveRemarks] = useState("");

  const [claimList, setClaimList] = useState(() => activityData?.claims || []);
  const claimStatus = claimList?.[0]?.status_display;

  const allItemsSubmitted = useMemo(() => {
    const items = claimList?.[0]?.claim_items || [];
    if (!items.length) return false;

    return items.every((item) => {
      const { label } = getStatusVariant(item.expense_status);
      return label === "Submitted";
    });
  }, [claimList]);

  const [selectedMasterClaimId, setSelectedMasterClaimId] = useState(null);

  const fetchClaimsForActivity = useCallback(async () => {
    if (!cp_emp_id || !activityData) return;

    try {
      setIsLoading(true);
      const profileRes = await getemployeeLists({ emp_id: cp_emp_id });
      const profile = profileRes?.data?.[0] || {};

      if (!profile.id) {
        setClaimList([]);
        return;
      }

      const claimRes = await getEmpClaim("GET", profile.id, "CY");
      setClaimList(matchClaimsToActivity(claimRes?.data || [], activityData));
    } catch (error) {
      console.error(error);
      toast.error("Failed to load claims");
      setClaimList([]);
    } finally {
      setIsLoading(false);
    }
  }, [cp_emp_id, activityData]);

  const totalClaim = useMemo(() => {
    return claimList.reduce(
      (acc, claim) => {
        const submittedItems = (claim?.claim_items || []).filter((item) => {
          const { label } = getStatusVariant(item.expense_status);
          return label === "Submitted" || label === "Approved";
        });

        submittedItems.forEach((item) => {
          acc.totalOPE += Number(item?.expense_amt || 0);
          acc.totalSettlement += Number(item?.settlement_amt || 0);
        });

        return acc;
      },
      { totalOPE: 0, totalSettlement: 0 }
    );
  }, [claimList]);

  useEffect(() => {
    if (activityData?.claims?.length) {
      setClaimList(activityData.claims);
    } else {
      fetchClaimsForActivity();
    }
  }, [activityData?.id || activityData?.planned_start_date]);


  const handleApproveReject = async ({
    masterClaimId,
    claimItems,
    actionType = "APPROVE",   // "APPROVE" | "REJECT"
    remarks = "",
  }) => {
    if (!masterClaimId || !claimItems?.length) {
      toast.error("Invalid claim data");
      return;
    }

    try {
      setIsLoading(true);

      const approveTypeMap = {
        APPROVE: "A",
        REJECT: "R",
        FORWARD: "F",
        BackToClaimant: "B",
      };

      const claim_list = claimItems.map((claim) => ({
        claim_id: claim.claim_id,
        a_emp_id: loggedEmpId, // TODO: replace with selectedManager / validationEntry?.approved_emp_id if needed
        approve_type: approveTypeMap[actionType] || "",
        approved_amt: actionType === "REJECT" ? "0" : String(claim.expense_amt ?? "0"),
        remarks: remarks || claim.remarks || "",
      }));

      const payload = {
        m_claim_id: masterClaimId,
        remarks: remarks || "",
        call_mode: "APPROVE_CLAIM",
        claim_list,
      };

      // console.log("Approve payload →", payload);

      const res = await postClaimAction(payload);

      // console.log("api payload", payload)

      // const res = { status: 200 }

      if (res?.status === 200) {
        toast.success(
          actionType === "APPROVE"
            ? claimItems.length > 1
              ? "All claim items approved successfully"
              : "Claim approved successfully"
            : "Claim rejected successfully"
        );
        await fetchClaimsForActivity();
      }
    } catch (error) {
      toast.error(
        error?.data?.message ||
        error?.data ||
        "Failed to process the claim. Please try again later."
      );
    } finally {
      setIsLoading(false);
      setSelectedMasterClaimId(null);
      setSelectedClaimItem(null);
      setOpenSubmitAllModal(false);
      setApproveRemarks("");
    }
  };

  const handleSubmitAll = (masterClaimId) => {
    // take all claim items of the first master claim
    const items = claimList?.[0]?.claim_items || [];

    if (!items.length) {
      toast.info("No claims found to approve");
      return;
    }

    const pendingItems = items.filter((item) => {
      const { label } = getStatusVariant(item.expense_status);
      // adjust these labels according to your getStatusVariant output
      return !["Submitted", "Approved", "Rejected"].includes(label);
    });

    const itemsToSend = pendingItems.length ? pendingItems : items;

    if (!itemsToSend.length) {
      toast.info("No pending claims to approve");
      return;
    }

    handleApproveReject({
      masterClaimId,
      claimItems: itemsToSend,
      actionType: "APPROVE",
      remarks: approveRemarks,
    });
  };

  // ---------- INDIVIDUAL APPROVE / REJECT ----------
  const handleIndividualAction = (item, type) => {
    setSelectedClaimItem(item);
    setApproveType(type); // "APPROVE" | "REJECT"
    setSelectedMasterClaimId(
      item?.master_data?.master_claim_id || claimList?.[0]?.master_claim_id
    );
    setOpenSubmitAllModal(true);
  };

  const allocationResources = useMemo(() => {
    return (activityData?.grouped_data || []).map((allocation) => {
      const matchingRetainer = (
        allocation?.original_P?.retainer_list || []
      ).find(
        (r) =>
          r.a_type === "P" &&
          r.start_date === allocation?.original_P?.start_date &&
          r.end_date === allocation?.original_P?.end_date
      );

      return {
        allocationId: allocation?.allocation_id || allocation?.id || allocation?.allAEntries?.[0]?.id,
        start_date: matchingRetainer?.start_date,
        end_date: matchingRetainer?.end_date,
        tl_count: matchingRetainer?.tl_count || 0,
        tl_rate: matchingRetainer?.tl_rate || 0,
        ex_count: matchingRetainer?.ex_count || 0,
        ex_rate: matchingRetainer?.ex_rate || 0,
        activityStatus: allocation?.activityStatus || "",
        statusDisplay: allocation?.statusDisplay || "",
      };
    });
  }, [activityData]);

  return (
    <Layout title="Clam Details">
      <ClaimsHeader>
        <Tagline>Claim Detailed view</Tagline>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
          {allocationResources.length === 1 && (
            <>
              <DetailItem>
                <DetailIconWrap><FaUserTie size={13} /></DetailIconWrap>
                <DetailText>
                  <DetailLabel>Required TL</DetailLabel>
                  <DetailValue>{allocationResources[0].tl_count ?? "—"}</DetailValue>
                  {allocationResources[0].tl_rate && <DetailValue>{allocationResources[0].tl_rate ?? "—"}/per day</DetailValue>}
                </DetailText>
              </DetailItem>

              <DetailItem>
                <DetailIconWrap><FaUser size={13} /></DetailIconWrap>
                <DetailText>
                  <DetailLabel>Required EX</DetailLabel>
                  <DetailValue>{allocationResources[0].ex_count ?? "—"}</DetailValue>
                  {allocationResources[0].ex_rate && <DetailValue>{allocationResources[0].ex_rate ?? "—"}/per day</DetailValue>}

                </DetailText>
              </DetailItem>
            </>
          )}

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

      {allocationResources.length > 1 && (
        <Card title="Allocation Dates">
          <DetailsGrid style={{ marginTop: "1rem" }}>
            {allocationResources.map((allocation, index) => (
              <DetailItem key={allocation.allocationId || index}>
                <DetailIconWrap>
                  <FaUserTie size={13} />
                </DetailIconWrap>
                <DetailText>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                    <DetailLabel>Allocation {index + 1}</DetailLabel>
                    <Badge variant={getStatusVariant(allocation.activityStatus)}>
                      {allocation.statusDisplay}
                    </Badge>
                  </div>
                  <DetailValue>
                    {formatDate(allocation.start_date)} – {formatDate(allocation.end_date)}
                  </DetailValue>
                  <DetailValue>
                    TL: {allocation.tl_count} &nbsp; | &nbsp;
                    EX: {allocation.ex_count}
                  </DetailValue>
                </DetailText>
              </DetailItem>
            ))}
          </DetailsGrid>
        </Card>
      )}

      <Card hoverable={false} style={{ marginTop: "1rem" }} title={
        <>
          <FaFileInvoiceDollar size={12} style={{ marginRight: "0.4rem" }} />
          Claims {claimList[0]?.claim_items?.length && `(${claimList[0]?.claim_items?.length})`}
        </>
      }
      >
        {claimList.length > 0 && (
          <InfoPill style={{ marginBottom: "0.8rem", fontSize: "1rem" }}>
            <FaFileInvoiceDollar size={12} style={{ marginRight: "0.4rem" }} />
            <span>Clam Id:</span>
            {claimList[0].master_claim_id}
          </InfoPill>
        )}

        {(activityData.activityStatus !== "AP" && activityData.activityStatus !== "AS" && activityData.activityStatus !== "C") ?
          (<EmptyRow style={{ fontWeight: "600", fontSize: "0.8rem" }}>Activity not completed yet</EmptyRow>) :
          claimList.length === 0 ? (
            <EmptyRow>No claims submitted yet</EmptyRow>
          ) : (
            <DataTable
              emptyMessage="No claims submitted yet"
              isLoading={isLoading}
              columns={["Sl no.", "Category", "Date", "Amount", "Status", "Remarks", "Reference File", "Action"]}
              data={claimList.flatMap((claim) =>
                (claim?.claim_items || []).map((item) => ({ ...item, master_data: claim, }))
              )}
              renderRow={((item) => {
                // console.log(item)
                const { variant, label } = getStatusVariant(item.expense_status)
                const index = item?.master_data?.claim_items?.findIndex(
                  (data) => data.id === item.id
                );

                return (
                  <>
                    {/* <Td>{item.claim_id}</Td> */}
                    <Td style={{ marginLeft: "1rem" }}>{index >= 0 ? index + 1 : "—"}</Td>
                    <Td><Badge variant="info" style={{ fontSize: "0.62rem" }}>{item.item_name}</Badge></Td>
                    <Td>{item.expense_date}</Td>
                    <Td>{currency(item.expense_amt)}</Td>
                    <Td><Badge variant={variant}>{label}</Badge></Td>
                    <Td>
                      <RemarkField title={item.remarks || "--"}>
                        {item.remarks || "--"}
                      </RemarkField>
                    </Td>
                    <Td><FileLink href={item.submitted_file_1} target="_blank" rel="noreferrer" disabled={!item.submitted_file_1}>{item.submitted_file_1 ? "View" : "Not Attached"}</FileLink></Td>
                    {/* {(ViewMode !== "VIEW" && label !== "Submitted") && <Td><Button size="sm" onClick={() => handleOpenClaimModal(item)}>Update</Button></Td>} */}
                    <Td>{(() => {
                      const { label } = getStatusVariant(item.expense_status);
                      const isFinal = label === "Approved" || label === "Rejected" || label === "Not Submitted";

                      if (ViewMode === "VIEW" || isFinal) return null;

                      return (
                        <div style={{ display: "flex", gap: "0.4rem" }}>
                          <Button
                            size="sm"
                            onClick={() => handleIndividualAction(item, "APPROVE")}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outlines"
                            size="sm"
                            onClick={() => handleIndividualAction(item, "REJECT")}
                          >
                            Reject
                          </Button>
                        </div>
                      );
                    })()}</Td>
                  </>
                )
              })}

            />
          )}

        <ClaimGrandTotalBar>
          {/* <span>Total settled Amount: {currency(totalClaim.totalSettlement)}</span> */}
          <span>Total Claim Amount: {currency(totalClaim.totalOPE)}</span>
        </ClaimGrandTotalBar>



        {claimList.length > 0 && allItemsSubmitted && claimStatus !== "Approved" &&
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button onClick={() => {
              setSelectedClaimItem(null);          // bulk mode
              setApproveType("APPROVE");
              setSelectedMasterClaimId(claimList?.[0]?.master_claim_id || null);
              setOpenSubmitAllModal(true);
            }}> <FaCheck /> Approve claims</Button>
          </div>}
      </Card>


      {openSubmitAllModal && (
        <ConfirmPopup
          isOpen={openSubmitAllModal}
          title="Confirmation"
          message={
            selectedClaimItem
              ? `Are you sure you want to ${approveType === "APPROVE" ? "approve" : "reject"} this claim item?`
              : "Are you sure you want to approve all pending claim items?"
          }
          onConfirm={() => {
            if (selectedClaimItem) {
              // individual
              handleApproveReject({
                masterClaimId: selectedMasterClaimId,
                claimItems: [selectedClaimItem],
                actionType: approveType,
                remarks: approveRemarks,
              });
            } else {
              // bulk
              handleSubmitAll(selectedMasterClaimId);
            }
          }}
          onClose={() => {
            setOpenSubmitAllModal(false);
            setSelectedMasterClaimId(null);
            setSelectedClaimItem(null);
            setApproveRemarks("");
          }}
          confirmLabel="Yes"
        />
      )}
    </Layout>
  );
};

export default ClamDetailsScreen;

const getStatusVariant = (expense_status) => {
  const statusMap = {
    'N': { variant: 'warning', label: 'Not Submitted' },
    'S': { variant: 'success', label: 'Submitted' },
    'A': { variant: 'info', label: 'Approved' },
    'R': { variant: 'error', label: 'Rejected' },
    // 'P': { variant: 'info', label: 'Pending' },
  };

  return statusMap[expense_status] || { variant: 'default', label: 'Unknown' };
};
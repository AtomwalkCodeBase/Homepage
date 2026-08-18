import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { FaPlus, FaUserCheck, FaUserPlus, FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { LuCopy, LuCopyPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { theme } from "../../../styles/Theme";
import { DateForApiFormate, formatAPITime, formatToApiDate, getCurrentDateTimeDefaults } from "../../../pages/ProjectManagement/utils/utils";
import { getContractAllocationData, postAllocationData, postContarctAllocationData } from "../../../services/productServices";
import { useFilter } from "../../../pages/ProjectManagement/hooks/useFilter";
import Card from "../../Card";
import Button from "../../Button";
import Badge from "../../Badge";
import AddActualModal from "./AddActualModal";
import ConfirmPopup from "../ConfirmPopup";
import { buildActualPayloadsForSubmit } from "../../../pages/ProjectManagement/utils/resourceAllocationLogic";

const ScrollableTableWrapper = styled.div`
  max-height: 800px;
  overflow-y: auto;

  border-radius: 8px;
`;

const DateBlock = styled.div`
  margin-bottom: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors?.primary || '#e0e0e0'}88;
  border-radius: 8px;
  overflow: hidden;
`;

const DateHeader = styled.div`
  background: #f8f9fa;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const HeaderDate = styled.div`
  font-size: ${({ theme }) => theme.fontSize?.md || '0.95rem'};
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || '#333'};
`;

const CountPill = styled.div`
  font-size: 0.8rem;
  color:  ${({ theme }) => theme.colors?.card || '#333'};
  strong { color: ${({ theme }) => theme.colors?.card || '#333'}; }
  background-color: ${({ $variant }) => ($variant ? theme.colors.success : theme.colors.error)};
  padding: ${({ theme }) => theme.spacing.xs || '0.75rem'};
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.25rem'};
`;

const Section = styled.div`
  padding: 14px 16px;
  border-bottom: 1px solid #eee;
  &:last-child { border-bottom: none; }
`;

const SectionTitle = styled.div`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.primary || '#888'};
  margin-bottom: 8px;
`;

const PlanActualGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SubPanel = styled.div`
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SubPanelHeader = styled.div`
  background: ${({ $variant, theme }) =>
    $variant === 'plan'
      ? (theme.colors?.backgroundAlt || '#f1f5f9')
      : '#fff7ed'};
  padding: 6px 10px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${({ $variant }) => ($variant === 'plan' ? '#334155' : '#9a5b13')};
`;

const ResourceRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-top: 1px solid #f1f1f1;
  &:first-of-type { border-top: none; }
`;

const ResourceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const ResourceName = styled.div`
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#333'};
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const ResourceMeta = styled.div`
  font-size: 0.68rem;
  color: #888;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const RateActionsCol = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

const RateTag = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.primary || '#0E7A91'};
  white-space: nowrap;
`;

const RowActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const EmptyRow = styled.div`
  padding: 14px 10px;
  text-align: center;
  font-size: 0.75rem;
  color: #999;
`;

const TotalsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  padding: 8px 12px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f9fafb'};
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #333;
`;


const ButtonRows = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ theme }) => theme.spacings?.md || '0.5rem'};
  margin-bottom: ${({ theme }) => theme.spacings?.md || '0.5rem'};
  gap: ${({ theme }) => theme.spacings?.md || '0.5rem'};
`;

const CountPill1 = styled.div`
  font-size: 0.8rem;
  color:  ${({ theme }) => theme.colors?.text || '#333'};
  /* strong { color: ${({ theme }) => theme.colors?.text || '#333'}; } */
  background-color: ${({ $variant }) => ($variant ? theme.colors.backgroundAlt : "")};
  padding: ${({ theme }) => theme.spacing.xs || '0.75rem'};
  border-radius: ${({ theme }) => theme.borderRadius.md || '0.25rem'};
  text-align: center;
`;

const Pill = styled.span`
  display: inline-block;
  width: 13px;
  height: 13px;
  background-color: ${({ $variant }) => ($variant ? theme.colors.success : theme.colors.error)};
  border-radius: 50%;
  margin-right: ${({ theme }) => theme.spacing.xs || '0.75rem'};
  margin-top: ${({ theme }) => theme.spacing.xs || '0.75rem'};
`;

const formatEmpType = (type) => (type === 'T' ? 'TL' : 'EX');

// Dummy claims data for design preview — replace with real claims once API is wired
const getDummyClaims = (dStr) => [
  { category: "Travel", id: `CLM-${dStr}-01`, amount: 1200, file: "#" },
  { category: "Food", id: `CLM-${dStr}-02`, amount: 450, file: "#" },
];


const toLocalDateOnly = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return new Date(
      value.getFullYear(),
      value.getMonth(),
      value.getDate()
    );
  }

  // supports YYYY-MM-DD
  const [year, month, day] = String(value)
    .split("T")[0]
    .split("-")
    .map(Number);

  return new Date(year, month - 1, day);
};

const toInputDate = (date) => {
  if (!date) return "";

  const d = date instanceof Date ? date : toLocalDateOnly(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const MONTH_ABBR = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

const parseApiDateKey = (dStr) => {
  if (typeof dStr !== "string") return null;

  let match = dStr.match(/^(\d{4})-(\d{2})-(\d{2})$/); // YYYY-MM-DD
  if (match) {
    const [, y, m, d] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return isNaN(date.getTime()) ? null : date;
  }

  match = dStr.match(/^(\d{2})-(\d{2})-(\d{4})$/); // DD-MM-YYYY
  if (match) {
    const [, d, m, y] = match;
    const date = new Date(Number(y), Number(m) - 1, Number(d));
    return isNaN(date.getTime()) ? null : date;
  }

  match = dStr.match(/^(\d{2})-([A-Za-z]{3})-(\d{4})$/); // ADD — DD-MMM-YYYY
  if (match) {
    const [, d, mon, y] = match;
    const monthIndex = MONTH_ABBR[mon.toLowerCase()];
    if (monthIndex == null) return null;
    const date = new Date(Number(y), monthIndex, Number(d));
    return isNaN(date.getTime()) ? null : date;
  }

  return null;
};

/* ---------------------------------- */
/* Main Component                      */
/* ---------------------------------- */

const CurrentAssignments = ({
  dateWiseAssignments,
  dayWindow,
  editingId,
  handleEditDate,
  handleDeleteDate,
  handleFieldChange,
  handleConfirmUpdate,
  handleCancelEdit,
  activityStart,
  activityEnd,
  activityData,
  employees = [],
  loadAllData,
  plannedTL,
  plannedEX,
  plannedTLRate,
  plannedEXRate,
  tlContractRate,
  setTlContractRate,
  exContractRate,
  setExContractRate,
  getContractRateByType,
  busyDateMap = {},
  loading: parentLoading = false,
}) => {
  const cpId = activityData?.emp_id;

  const [loading, setLoading] = useState(false);
  const isLoading = loading || parentLoading;

  const today = new Date();
  const { apiDate } = getCurrentDateTimeDefaults();

  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [allAEntries, setAllAEntries] = useState(activityData?.allAEntries || []);
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [actualDraftsByDate, setActualDraftsByDate] = useState({});
  const [isActualRangeModalOpen, setIsActualRangeModalOpen] = useState(false);
  const [actualStartDate, setActualStartDate] = useState("");
  const [actualEndDate, setActualEndDate] = useState("");
  const [confirmationModal, setConfirmationModal] = useState({
    isOpen: false,
    loading: false,
    title: "Confirmation",
    message: "",
    confirmLabel: "Confirm",
    onConfirm: null,
  });

  const navigate = useNavigate();

  const [rangeEmpId, setRangeEmpId] = useState("");
  const [rangeEmpType, setRangeEmpType] = useState("E");
  const [rangeRemarks, setRangeRemarks] = useState("");

  const [editedApiRowKeys, setEditedApiRowKeys] = useState(() => new Set());
  const [savedApiEditKeys, setSavedApiEditKeys] = useState(() => new Set());

  const [resourceList, setResourceList] = useState([]);

  const isPastActivityWindow = DateForApiFormate(activityEnd) && DateForApiFormate(today) >= DateForApiFormate(activityEnd);
  const isStatusApproved = activityData?.original_P?.status === "A" || activityData?.original_A?.status === "A";

  const hasAnyActivityStarted = allAEntries.length > 0;

  const a_id = activityData?.original_A?.id || activityData?.a_id || null;
  const [activityStarted, setActivityStarted] = useState(!!a_id);

  const [startedDates, setStartedDates] = useState(() => new Set());
  const [deletedApiRowKeys, setDeletedApiRowKeys] = useState(() => new Set());

  // last date (string) that has been started — used as the cutoff for "Copy Actual (All Dates)"
  const lastStartedDate = startedDates.size
    ? [...startedDates]
      .map((d) => DateForApiFormate(d, true))
      .sort()
      .at(-1)
    : null;

  const activityIdByDate = useMemo(() => {
    const map = {};
    allAEntries.forEach((entry) => {
      if (entry?.start_date && entry?.id) {
        map[entry.start_date] = entry.id;
      }
    });
    return map;
  }, [allAEntries]);

  useEffect(() => {
    if (!allAEntries.length) return;
    setStartedDates((prev) => {
      const next = new Set(prev);
      allAEntries.forEach((entry) => {
        if (entry?.start_date) next.add(entry.start_date);
      });
      return next;
    });
  }, [allAEntries]);

  useEffect(() => {
    if (plannedTLRate != null) {
      setTlContractRate(plannedTLRate);
    }

    if (plannedEXRate != null) {
      setExContractRate(plannedEXRate);
    }
  }, [plannedTLRate, plannedEXRate]);

  const handleStartActivityOnce = async () => {
    try {
      const p_id = activityData?.original_P?.id;
      if (!p_id) {
        toast.error("Missing p_id, cannot start activity");
        return;
      }

      const now = new Date();
      const activity_date = DateForApiFormate(activityStart);

      const start_time = now.toTimeString().slice(0, 5);

      const fd = new FormData();
      fd.append("emp_id", cpId);
      fd.append("activity_date", activity_date);
      fd.append("call_mode", "ADD");
      fd.append("p_id", p_id);
      fd.append("geo_type", "I");
      fd.append("start_time", formatAPITime(start_time));
      fd.append("end_time", "");

      await postAllocationData(fd);
      // for (let [key, value] of fd.entries()) {
      //   console.log(key, value);
      // }
      await loadAllData();

      // Fetch updated resource data to get new allAEntries
      await fetchResourceData();

      toast.success("Activity started.");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to start activity");
    }
  };

  const handleStartActivity = async (dStr) => {
    try {
      const p_id = activityData?.original_P?.id;
      if (!p_id) {
        toast.error("Missing p_id, cannot start activity");
        return;
      }

      const now = new Date();
      const activity_date = DateForApiFormate(activityStart); // dd-mm-yyyy
      const start_time = now.toTimeString().slice(0, 5); // "HH:MM"

      const fd = new FormData();
      fd.append("emp_id", cpId);
      fd.append("activity_date", activity_date);
      fd.append("call_mode", "ADD");
      fd.append("p_id", p_id);
      fd.append("geo_type", "I");
      fd.append("start_time", formatAPITime(start_time));
      fd.append("end_time", "");

      await postAllocationData(fd);

      await loadAllData();

      // Fetch updated resource data to get new allAEntries
      await fetchResourceData();

      toast.success(`Activity started for ${dStr}.`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to start activity");
    }
  };

  const fetchResourceData = useCallback(async () => {
    const startDate = activityData?.planned_start_date;
    const endDate = activityData?.planned_end_date;
    const allocationIds = [...new Set((activityData?.allAEntries || []).map(item => item.id).filter(Boolean))];

    if (!startDate || !endDate || !allocationIds.length) {
      // if (!startDate || !endDate) {
      setResourceList([]);
      return;
    }

    try {
      setLoading(true);
      const responses = await Promise.all(allocationIds.map(allocationId =>
        getContractAllocationData({
          emp_id: cpId,
          allocation_id: allocationId,
          // start_date: DateForApiFormate(startDate),
          // end_date: DateForApiFormate(endDate),
        })
      )
      );
      const mergedData = responses.flatMap((response) => Array.isArray(response?.data) ? response.data : []).filter(item => item?.is_active);;
      setResourceList(mergedData);
    } catch (error) {
      console.error("Failed to fetch resource data:", error);
      toast.error("Failed to load resource data");
      setResourceList([]);
    } finally {
      setLoading(false);
    }
  }, [activityData, cpId]);

  useEffect(() => {
    setAllAEntries(activityData?.allAEntries || []);
  }, [activityData]);

  useEffect(() => {
    if (!resourceList.length) return;
    setStartedDates((prev) => {
      const next = new Set(prev);
      resourceList.forEach((r) => {
        if (!r?.s_date || !r?.e_date) return;
        const s = toLocalDateOnly(r.s_date);
        const e = toLocalDateOnly(r.e_date);
        if (!s || !e) return;
        const cur = new Date(s);
        while (cur <= e) {
          next.add(formatToApiDate(cur));
          cur.setDate(cur.getDate() + 1);
        }
      });
      return next;
    });
  }, [resourceList]);

  useEffect(() => {
    fetchResourceData();
  }, [fetchResourceData]);

  // REPLACE handleConfirmFinalActual usage — this is now a top-level submit,
  // not per-date. Wire it to a single "Submit Actuals" button instead of the
  // per-DateBlock "Add Actual for all Dates" button.
  // UPDATE handleSubmitAllActuals — use per-date a_id from activityIdByDate instead of the single top-level a_id
  const handleSubmitAllActuals = async () => {
    try {
      const { addPayload, updatePayload, deletePayload, unchangedPayload } = buildActualPayloadsForSubmit(
        actualDraftsByDate,
        resourceList
      );

      // group rows by the a_id of their start_date
      const groupByAId = (rows) => {
        const groups = {};
        rows.forEach((row) => {
          const aId = activityIdByDate[row.start_date] || a_id || activityData?.original_P?.id;
          if (!groups[aId]) groups[aId] = [];
          groups[aId].push(row);
        });
        return groups;
      };

      const allGroups = groupByAId([...addPayload, ...updatePayload, ...deletePayload, ...unchangedPayload]);
      for (const [aIdForDate, rows] of Object.entries(allGroups)) {
        const fd = new FormData();
        fd.append("emp_id", cpId);
        fd.append("p_id", aIdForDate);
        const hasAddOrUpdate = rows.some((r) => !r.is_deleted);
        fd.append("call_mode", hasAddOrUpdate ? "UPDATE" : "UPDATE"); // always UPDATE — ADD alone can't carry deletes
        fd.append("c_emp_list", JSON.stringify(rows));
        await postContarctAllocationData(fd);
        // for (let [key, value] of fd.entries()) {
        //   console.log(key, value);
        // }


        const hasApiModification = rows.some(
          (r) => (r.source === "api" || r.resource_id != null) && (r.is_deleted || /* any field change is already reflected in the payload */ true));
        if (hasAddOrUpdate) {
          const totalNoOfResources = rows.length;
          const totalNoOfItem = rows.filter((r) => !r.is_deleted).reduce((sum, r) => sum + (Number(r.a_quanity) || 0), 0);
          const tlCount = rows.filter((r) => r.emp_type === "T" || r.emp_type === "TL").length;
          const exCount = rows.filter((r) => r.emp_type === "E" || r.emp_type === "EX").length;
          const resourceListStr = rows
            .filter((r) => !r.is_deleted)
            .map((r) => {
              const name = employees.find((e) => e.emp_id === r.emp_id)?.name || r.employee_name || "";
              const empType = r.emp_type === "T" || r.emp_type === "TL" ? "TL" : "EX";
              const quantity = Number(r.a_quanity) || 1;
              return `${name}^${quantity}^${empType}`;
            })
            .join("|");

          const activityFd = new FormData();
          activityFd.append("emp_id", cpId);
          activityFd.append("a_id", aIdForDate);
          activityFd.append("geo_type", "O");

          // Decide call_mode
          if (hasApiModification) {
            // Only the fields requested for DATA_CORRECT
            activityFd.append("call_mode", "DATA_CORRECT");
            activityFd.append("tl_count", tlCount);
            activityFd.append("ex_count", exCount);
            activityFd.append("no_of_resource", totalNoOfResources);
            activityFd.append("resource_list", resourceListStr);
            activityFd.append("no_of_items", totalNoOfItem); // same as resource count; change if your API expects something else
          } else {
            // Original UPDATE path
            const now = new Date();
            const end_time = now.toTimeString().slice(0, 5);

            activityFd.append("call_mode", "UPDATE");
            activityFd.append("activity_date", DateForApiFormate(today));
            activityFd.append("end_time", formatAPITime(end_time));
            activityFd.append("no_of_resource", totalNoOfResources);
            activityFd.append("resource_list", resourceListStr);
            activityFd.append("no_of_items", totalNoOfItem); // same as resource count; change if your API expects something else
            activityFd.append("is_complete", "1");
            activityFd.append("tl_count", tlCount);
            activityFd.append("ex_count", exCount);
          }

          await postAllocationData(activityFd);
        }
      }

      setDeletedApiRowKeys(new Set());
      setSavedApiEditKeys(new Set());
      setActualDraftsByDate({});

      await loadAllData();
      toast.success("Actuals saved successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to save actuals");
      throw err;
    }
  };

  useEffect(() => {
    if (!resourceList.length) return;

    setActualDraftsByDate((prev) => {
      const next = { ...prev };

      resourceList.forEach((resource) => {
        if (!resource?.s_date || !resource?.e_date) return;

        const startDate = toLocalDateOnly(resource.s_date);
        const endDate = toLocalDateOnly(resource.e_date);

        if (!startDate || !endDate) return;

        // resource applies to every date from s_date to e_date
        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {
          const dStr = formatToApiDate(currentDate);

          // create date draft if not available
          if (!next[dStr]) {
            next[dStr] = {
              confirmed: true,
              rows: [],
            };
          }

          const rowKey = `api-${resource.id}-${resource.allocation_id}-${dStr}`;

          // avoid duplicate API resource
          const alreadyExists = next[dStr].rows.some(
            (row) =>
              row.source === "api" &&
              row.resource_id === resource.id &&
              row.allocation_id === resource.allocation_id
          );

          if (!alreadyExists) {
            next[dStr] = {
              ...next[dStr],
              rows: [
                ...next[dStr].rows,
                {
                  rowKey,

                  // employee data
                  original_emp_id: resource.emp_id,
                  emp_id: resource.emp_id,
                  employee_name: resource.employee_name,
                  emp_type: resource.emp_type,

                  // resource data
                  remarks: resource.remarks || "",
                  contract_rate: Number(resource.contract_rate) || 0,
                  a_quanity: Number(resource.a_quanity ?? resource.a_quantity ?? 0) || 0,

                  // API identifiers
                  resource_id: resource.id,
                  allocation_id: resource.allocation_id,
                  order_item_id: resource.order_item_id,

                  // API flags
                  is_approved: Boolean(resource.is_approved),
                  is_present: Boolean(resource.is_present),
                  is_active: Boolean(resource.is_active),

                  // additional API values
                  a_percent: resource.a_percent,
                  ope_amt: resource.ope_amt,
                  app_remarks: resource.app_remarks || "",
                  approve_date: resource.approve_date,

                  // original API range
                  s_date: resource.s_date,
                  e_date: resource.e_date,

                  // identify source
                  source: "api",
                },
              ],
            };
          }

          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      return next;
    });
  }, [resourceList]);

  const handleSaveApiRowEdit = (rowKey) => {
    setEditedApiRowKeys((prev) => {
      const next = new Set(prev);
      next.delete(rowKey); // exit edit mode
      return next;
    });
    setSavedApiEditKeys((prev) => new Set(prev).add(rowKey));
  };

  const toggleEditApiRow = (rowKey, dStr, apiRowsForDate) => {
    setEditedApiRowKeys((prev) => {
      const next = new Set(prev);
      next.has(rowKey) ? next.delete(rowKey) : next.add(rowKey);
      return next;
    });

    setActualDraftsByDate((prev) => {
      if (prev[dStr]) return prev; // already has a draft, don't clobber it
      return {
        ...prev,
        [dStr]: {
          confirmed: false,
          rows: apiRowsForDate.map((row) => ({
            rowKey: row.rowKey,
            original_emp_id: row.original_emp_id,
            emp_id: row.emp_id,
            employee_name: row.employee_name,
            emp_type: row.emp_type,
            remarks: row.remarks,
            contract_rate: row.contract_rate,
            a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
            resource_id: row.resource_id, // needed so buildActualPayloadsForSubmit treats it as UPDATE not ADD
          })),
        },
      };
    });
  };
  const handleCancelCopyAllActual = () => {
    setActualDraftsByDate((prev) => {
      const next = {};
      Object.entries(prev).forEach(([dStr, draft]) => {
        if (draft.confirmed) next[dStr] = draft; // keep confirmed ones
      });
      return next;
    });
  };

  const hasUnconfirmedDrafts = Object.values(actualDraftsByDate).some((d) => !d.confirmed);

  const handleCancelCopyActual = (dStr) => {
    setActualDraftsByDate((prev) => {
      const next = { ...prev };
      delete next[dStr];
      return next;
    });
  };

  const handleAddActualRow = (dStr) => {
    const planAssignments = dateWiseAssignments[dStr] || []; // ADDED

    // ADDED — prefer the plan's own rate for a given emp_type on this date, fallback to global/plan default
    const rateForType = (empType) => {
      const planRow = planAssignments.find((r) => r.emp_type === empType && r.contract_rate);
      if (planRow) return planRow.contract_rate;

      // ADDED — fallback across all planned dates if this date has no matching type
      for (const dateKey of Object.keys(dateWiseAssignments)) {
        const match = (dateWiseAssignments[dateKey] || []).find((r) => r.emp_type === empType && r.contract_rate);
        if (match) return match.contract_rate;
      }

      return getContractRateByType(empType);
    };

    setActualDraftsByDate((prev) => {
      const draft = prev[dStr] || { confirmed: false, rows: [] };
      const defaultType = Number(employees[0]?.grade_level) > 1 ? "T" : "E";
      return {
        ...prev,
        [dStr]: {
          ...draft,
          rows: [
            ...draft.rows,
            {
              rowKey: crypto.randomUUID(),
              original_emp_id: null, // brand-new resource → always "Replaced"/new
              emp_id: employees[0]?.emp_id || "",
              employee_name: employees[0]?.name || "",
              emp_type: defaultType,
              remarks: "",
              contract_rate: rateForType(defaultType),
              a_quanity: 0,
              start_date: dStr,
              end_date: dStr,
            },
          ],
        },
      };
    });
  };

  const handleCopyActual = (dStr, planAssignments) => {
    setActualDraftsByDate((prev) => ({
      ...prev,
      [dStr]: {
        confirmed: false,
        rows: planAssignments.map((row) => ({
          rowKey: crypto.randomUUID(),
          original_emp_id: row.emp_id,   // used to detect "Replaced"
          emp_id: row.emp_id,
          employee_name: row.employee_name,
          emp_type: row.emp_type,
          remarks: row.remarks || "",
          contract_rate: row.contract_rate || getContractRateByType(row.emp_type),
          a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
          start_date: dStr,
          end_date: dStr,
        })),
      },
    }));
  };

  const handleOpenActualRangeModal = () => {
    setActualStartDate(minActualDate);
    setActualEndDate(maxActualDate);
    setIsActualRangeModalOpen(true);
  };

  const handleCopyAllActual = () => {
    if (!lastStartedDate) {
      toast.error("Start the activity for a date before copying actuals");
      return;
    }
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    setActualDraftsByDate((prev) => {
      const next = { ...prev };
      dayWindow.forEach((d) => {
        const dStr = formatToApiDate(d);
        const dStrComparable = DateForApiFormate(dStr, true);

        // if (dStrComparable > lastStartedDate) return;
        const currentDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
        if (currentDate > todayDate) return;
        if (next[dStr]?.rows?.length) return; // FIXED — only skip if it actually has data, not an empty leftover draft

        const hasResourceActual = resourceList.some((row) => {
          const currDate = DateForApiFormate(dStr, true);
          const startDate = DateForApiFormate(row.s_date, true);
          const endDate = DateForApiFormate(row.e_date, true);
          return currDate && startDate && endDate && currDate >= startDate && currDate <= endDate;
        });
        if (hasResourceActual) return;

        const planAssignments = dateWiseAssignments[dStr] || [];
        if (planAssignments.length === 0) return;
        next[dStr] = {
          confirmed: false,
          rows: planAssignments.map((row) => ({
            rowKey: crypto.randomUUID(),
            original_emp_id: row.emp_id,
            emp_id: row.emp_id,
            employee_name: row.employee_name,
            emp_type: row.emp_type,
            remarks: row.remarks || "",
            contract_rate: row.contract_rate || getContractRateByType(row.emp_type),
            a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
            start_date: dStr,
            end_date: dStr,
          })),
        };
      });
      return next;
    });
  };

  const handleActualFieldChange = (dStr, rowKey, field, value) => {
    setActualDraftsByDate((prev) => {
      const draft = prev[dStr];
      if (!draft) return prev;
      return {
        ...prev,
        [dStr]: {
          ...draft,
          rows: draft.rows.map((r) => (r.rowKey === rowKey ? { ...r, [field]: value } : r)),
        },
      };
    });
  };

  const handleActualEmployeeChange = (dStr, rowKey, emp_id) => {
    const emp = employees.find((e) => e.emp_id === emp_id);
    setActualDraftsByDate((prev) => {
      const draft = prev[dStr];
      if (!draft) return prev;
      return {
        ...prev,
        [dStr]: {
          ...draft,
          rows: draft.rows.map((r) =>
            r.rowKey === rowKey ? { ...r, emp_id, employee_name: emp?.name || r.employee_name } : r
          ),
        },
      };
    });
  };

  // const handleRemoveActualRow = (dStr, rowKey) => {
  //   setActualDraftsByDate((prev) => {
  //     const draft = prev[dStr];
  //     if (!draft) return prev;

  //     const target = draft.rows.find((r) => r.rowKey === rowKey);
  //     if (!target) return prev;

  //     const isApiRow = target.source === "api" || target.resource_id != null;

  //     if (isApiRow) {
  //       return {
  //         ...prev,
  //         [dStr]: {
  //           ...draft, rows: draft.rows.map((r) => r.rowKey === rowKey ? { ...r, is_deleted: true } : r),
  //         },
  //       };
  //     }

  //     return { ...prev, [dStr]: { ...draft, rows: draft.rows.filter((r) => r.rowKey !== rowKey) } };
  //   });
  // };

  const handleRemoveActualRow = (dStr, rowKey) => {
    setActualDraftsByDate((prev) => {
      const draft = prev[dStr];
      if (!draft) return prev;

      const target = draft.rows.find((r) => r.rowKey === rowKey);
      const isApiRow = target && (target.source === "api" || target.resource_id != null);

      // remember API rows that were hard-removed so Submit button can appear
      if (isApiRow) {
        setDeletedApiRowKeys((prevKeys) => new Set(prevKeys).add(rowKey));
      }

      return {
        ...prev,
        [dStr]: {
          ...draft,
          rows: draft.rows.filter((r) => r.rowKey !== rowKey),
        },
      };
    });
  };

  const handleConfirmActual = async (dStr) => {
    setActualDraftsByDate((prev) => ({ ...prev, [dStr]: { ...prev[dStr], confirmed: true } }));
  }

  // const handleConfirmFinalActual = async (dStr) => {
  //   const draft = actualDraftsByDate[dStr];
  //   if (!draft || draft.rows.length === 0) {
  //     toast.error("No resources to save");
  //     return;
  //   }

  //   try {
  //     const actualId = a_id || activityData?.original_P?.id;

  //     const originalResourceRowsForDate = resourceList.filter((row) => {
  //       const currentDate = DateForApiFormate(dStr, true);
  //       const startDate = DateForApiFormate(row.s_date, true);
  //       const endDate = DateForApiFormate(row.e_date, true);
  //       return currentDate && startDate && endDate && currentDate >= startDate && currentDate <= endDate;
  //     });

  //     const { addPayload, updatePayload, deletePayload } = buildActualPayloads(
  //       dStr,
  //       draft.rows,
  //       originalResourceRowsForDate
  //     );

  //     const c_emp_list = [
  //       ...addPayload.map((r) => ({ ...r, call_mode: "ADD" })),
  //       ...updatePayload.map((r) => ({ ...r, call_mode: "UPDATE" })),
  //       ...deletePayload.map((r) => ({ ...r, call_mode: "DELETE" })),
  //     ];

  //     const fd = new FormData();
  //     fd.append("emp_id", cpId);
  //     fd.append("p_id", actualId);
  //     fd.append("c_emp_list", JSON.stringify(c_emp_list));

  //     await postAllocationData(fd);

  //     setActualDraftsByDate((prev) => ({ ...prev, [dStr]: { ...prev[dStr], confirmed: true } }));
  //     toast.success("Actual saved successfully");
  //   } catch (err) {
  //     toast.error(err?.response?.data?.message || "Failed to save actual");
  //   }
  // };

  // const handleEditActualAgain = (dStr) => {
  //   setActualDraftsByDate((prev) => ({ ...prev, [dStr]: { ...prev[dStr], confirmed: false } }));
  // };

  const handleEditActualAgain = (dStr) => {
    setActualDraftsByDate((prev) => {
      // Already have a draft → unlock it and capture a fresh baseline
      if (prev[dStr]) {
        const currentRows = prev[dStr].rows || [];
        return {
          ...prev,
          [dStr]: {
            ...prev[dStr], confirmed: false,
            // deep-ish copy so later mutations don't pollute the baseline
            baselineRows: currentRows.map((r) => ({ ...r })),
          },
        };
      }

      // No draft yet (pure API actuals) → create one from current API rows
      const apiRowsForDate = resourceList
        .filter((row) => {
          if (!row?.s_date || !row?.e_date) return false;
          const currentDate = DateForApiFormate(dStr, true);
          const startDate = DateForApiFormate(row.s_date, true);
          const endDate = DateForApiFormate(row.e_date, true);
          return (
            currentDate &&
            startDate &&
            endDate &&
            currentDate >= startDate &&
            currentDate <= endDate
          );
        })
        .map((row) => ({
          rowKey: `api-${row.id}-${row.allocation_id}-${dStr}`,
          original_emp_id: row.emp_id,
          emp_id: row.emp_id,
          employee_name: row.employee_name,
          emp_type: row.emp_type,
          remarks: row.remarks || "",
          contract_rate: Number(row.contract_rate) || 0,
          a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
          resource_id: row.id,
          allocation_id: row.allocation_id,
          order_item_id: row.order_item_id,
          is_approved: Boolean(row.is_approved),
          is_present: Boolean(row.is_present),
          is_active: Boolean(row.is_active),
          a_percent: row.a_percent,
          ope_amt: row.ope_amt,
          app_remarks: row.app_remarks || "",
          approve_date: row.approve_date,
          s_date: row.s_date,
          e_date: row.e_date,
          source: "api",
        }));

      return {
        ...prev,
        [dStr]: {
          confirmed: false,
          rows: apiRowsForDate,
          baselineRows: apiRowsForDate.map((r) => ({ ...r })),
        },
      };
    });
  };

  const handleCancelApiRowEdit = (dStr, rowKey, originalRow) => {
    setEditedApiRowKeys((prev) => {
      const next = new Set(prev);
      next.delete(rowKey);
      return next;
    });

    if (!originalRow) return;

    setActualDraftsByDate((prev) => {
      const draft = prev[dStr];
      if (!draft) return prev;
      return {
        ...prev,
        [dStr]: {
          ...draft,
          rows: draft.rows.map((r) =>
            r.rowKey === rowKey
              ? { ...r, emp_id: originalRow.emp_id, employee_name: originalRow.employee_name, emp_type: originalRow.emp_type, remarks: originalRow.remarks, contract_rate: originalRow.contract_rate, a_quanity: Number(originalRow.a_quanity ?? originalRow.a_quantity ?? 0) || 0 }
              : r
          ),
        },
      };
    });
  };

  // const plannedDates = dayWindow.filter((d) => {
  //   const dStr = formatToApiDate(d);
  //   return (dateWiseAssignments[dStr] || []).length > 0;
  // });

  // CHANGE plannedDates — include actual-draft dates even if outside dayWindow
  const dayWindowStrs = new Set(dayWindow.map((d) => formatToApiDate(d)));

  const isValidDateKey = (dStr) =>
    typeof dStr === "string" &&
    (/^\d{4}-\d{2}-\d{2}$/.test(dStr) || /^\d{2}-\d{2}-\d{4}$/.test(dStr) || /^\d{2}-[A-Za-z]{3}-\d{4}$/.test(dStr));

  const actualOnlyDateKeys = new Set([
    ...Object.keys(actualDraftsByDate).filter(
      (dStr) => isValidDateKey(dStr) && (actualDraftsByDate[dStr]?.rows || []).length > 0
    ),
    ...resourceList.flatMap((r) => { // CHANGED — was .map(r => formatToApiDate(toLocalDateOnly(r.s_date)))
      const s = parseApiDateKey(r.s_date) || toLocalDateOnly(r.s_date); // CHANGED — try parseApiDateKey first for "dd-MMM-yyyy"
      const e = parseApiDateKey(r.e_date) || toLocalDateOnly(r.e_date);
      if (!s || !e) return [];
      const dates = [];
      const cur = new Date(s);
      while (cur <= e) {
        dates.push(formatToApiDate(cur));
        cur.setDate(cur.getDate() + 1);
      }
      return dates;
    }).filter(Boolean),
    ...allAEntries.map((e) => e.start_date).filter(isValidDateKey),
  ]);

  const draftOnlyDates = [...actualOnlyDateKeys]
    .filter((dStr) => !dayWindowStrs.has(dStr))
    .map((dStr) => ({ d: parseApiDateKey(dStr), dStr }))
    .filter((item) => item.d);

  const plannedDates = [
    ...dayWindow
      .filter((d) => {
        const dStr = formatToApiDate(d);
        const hasPlan = (dateWiseAssignments[dStr] || []).length > 0;
        const hasActualDraft = (actualDraftsByDate[dStr]?.rows || []).length > 0;
        return hasPlan || hasActualDraft;
      })
      .map((d) => ({ d, dStr: formatToApiDate(d) })),
    ...draftOnlyDates,
  ].sort((a, b) => a.d - b.d);

  const filteredPlannedDates = useFilter({
    data: plannedDates,
    fields: [],
    search: "",
    extraFilters: {
      dateRange: {
        field: "d",
        from: filterStartDate ? toLocalDateOnly(filterStartDate) : null,
        to: filterEndDate ? toLocalDateOnly(filterEndDate) : null,
      },
    },
  });
  // console.log("plannedDates", plannedDates)

  // const didAutoSetFilterRef = useRef(false);
  useEffect(() => {
    if (!plannedDates.length) return;
    if (filterStartDate || filterEndDate) return;

    const validDates = plannedDates
      .map(({ d }) => d)
      .filter((d) => d instanceof Date && !isNaN(d));

    if (!validDates.length) return;

    const activityStartDateOnly = toLocalDateOnly(DateForApiFormate(activityStart, true));

    const candidateMinDate = new Date(Math.min(...validDates));
    const minDate =
      activityStartDateOnly && candidateMinDate < activityStartDateOnly
        ? candidateMinDate
        : activityStartDateOnly || candidateMinDate;

    const maxDate = new Date(Math.max(...validDates));

    setFilterStartDate(toInputDate(minDate));
    // setFilterEndDate(toInputDate(maxDate));
    setFilterEndDate((prev) => {
      if (!prev) return toInputDate(maxDate);
      const prevDate = toLocalDateOnly(prev);
      if (!prevDate || maxDate > prevDate) return toInputDate(maxDate);
      return prev;
    });
  }, [plannedDates, activityStart]);


  today.setHours(0, 0, 0, 0);

  const activityStartDate = toLocalDateOnly(activityStart);
  const activityEndDate = toLocalDateOnly(activityEnd);

  // End date should never exceed today
  const maxAllowedActualDate =
    activityEndDate && activityEndDate < today
      ? activityEndDate
      : today;

  // const minActualDate = activityStartDate ? toInputDate(activityStartDate): "";

  const minActualDate = activityStartDate ? toInputDate(activityStartDate) : "";
  const maxActualDate = toInputDate(maxAllowedActualDate);

  const hasAnyDateWithoutActual = plannedDates.some(({ dStr }) => {
    const alreadyHasResourceActual = resourceList.some((row) => {
      const currentDate = DateForApiFormate(dStr, true);
      const startDate = DateForApiFormate(row.s_date, true);
      const endDate = DateForApiFormate(row.e_date, true);
      return currentDate && startDate && endDate && currentDate >= startDate && currentDate <= endDate;
    });
    return !alreadyHasResourceActual;
  });

  const hasUserActualChanges = savedApiEditKeys.size > 0 || deletedApiRowKeys.size > 0 || Object.values(actualDraftsByDate).some((draft) =>
    // (draft.rows || []).some((row) => row.source !== "api" || row.is_deleted === true)
    (draft.rows || []).some((row) => row.source !== "api")
  );

  const openConfirmation = ({
    title = "Confirmation",
    message,
    confirmLabel = "Confirm",
    onConfirm,
    reload = false,
  }) => {
    setConfirmationModal({
      isOpen: true,
      loading: false,
      title,
      message,
      confirmLabel,
      onConfirm,
      reload,
    });
  };

  const closeConfirmation = () => {
    setConfirmationModal((prev) => ({
      ...prev,
      isOpen: false,
      loading: false,
      onConfirm: null,
    }));
  };

  const handleConfirmation = async () => {
    try {
      setConfirmationModal((prev) => ({ ...prev, loading: true }));

      if (confirmationModal.onConfirm) {
        await confirmationModal.onConfirm();
      }

      const shouldReload = confirmationModal.reload;
      closeConfirmation();
      if (shouldReload) {
        window.location.reload();
      }
    } catch (err) {
      setConfirmationModal((prev) => ({ ...prev, loading: false }));
    }
  };

  const handleSaveActualRange = (rows, startDate, endDate) => {
    setActualDraftsByDate((prev) => {
      const next = { ...prev };
      let cur = toLocalDateOnly(startDate);
      const end = toLocalDateOnly(endDate);

      while (cur <= end) {
        const dStr = formatToApiDate(cur);
        const existing = next[dStr] || { confirmed: false, rows: [] };
        next[dStr] = {
          ...existing,
          confirmed: false,
          rows: [
            ...existing.rows,
            ...rows.map((r) => ({
              rowKey: crypto.randomUUID(),
              original_emp_id: null,
              emp_id: r.emp_id,
              employee_name: r.employee_name,
              emp_type: r.emp_type,
              remarks: r.remarks,
              contract_rate: r.contract_rate ?? getContractRateByType(r.emp_type),
              start_date: dStr,
              end_date: dStr,
            })),
          ],
        };
        cur.setDate(cur.getDate() + 1);
      }
      return next;
    });

    setIsActualRangeModalOpen(false);
  };

  const hasLockedPlannedResource = Object.values(dateWiseAssignments || {}).flat().some(
    (resource) => resource?.is_approved === true || resource?.is_present === true
  );

  const disableContractRateFields = hasAnyActivityStarted || hasLockedPlannedResource || plannedTLRate || plannedEXRate;

  const hasAnyPlanFromApi = Object.values(dateWiseAssignments || {}).some(
    (rows) => (rows || []).some((r) => r.status === "ORIGINAL")
  );

  return (
    <>
      <Card
        title="Resource Overview"
        hoverable={false}
        headerAction={
          !hasAnyActivityStarted ? (
            isPastActivityWindow && hasAnyPlanFromApi ? (
              <Button size="md" variant="primary" onClick={() => openConfirmation({
                title: "Start Activity",
                message: "Are you sure you want to start this activity?",
                confirmLabel: "Start",
                onConfirm: handleStartActivityOnce,
                reload: true,
              })}>
                Start Activity
              </Button>
            ) : null // per-date Start buttons handle it inside each DateBlock instead
          ) : isPastActivityWindow && hasAnyDateWithoutActual ? (
            !isStatusApproved ? (
              <RenderButton
                activityStarted={activityStarted}
                handleStartActivity={handleStartActivity}
                handleCopyAllActual={handleCopyAllActual}
                handleCancelCopyAllActual={handleCancelCopyAllActual}
                hasUnconfirmedDrafts={hasUnconfirmedDrafts}
                handleOpenActualRangeModal={handleOpenActualRangeModal}
              />
            ) : null
          ) : isPastActivityWindow ? (
            !isStatusApproved ? (
              <ButtonRows>
                <Button size="sm" variant="outline" onClick={handleOpenActualRangeModal}>
                  <FaPlus /> Add Actual
                </Button>
              </ButtonRows>
            ) : null
          ) : null
        }  >
        <ScrollableTableWrapper>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {filteredPlannedDates.length !== 0 &&
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", margin: "0.5rem 0" }}>
                <FormField>
                  <FormLabel>From</FormLabel>
                  <FormInput type="date" value={filterStartDate} onChange={(e) => setFilterStartDate(e.target.value)} />
                </FormField>
                <FormField>
                  <FormLabel>To</FormLabel>
                  <FormInput type="date" value={filterEndDate} onChange={(e) => setFilterEndDate(e.target.value)} />
                </FormField>
                {(filterStartDate || filterEndDate) && (
                  <FormField>
                    <FormLabel> </FormLabel>
                    <Button size="sm" variant="outlines" onClick={() => { setFilterStartDate(""); setFilterEndDate(""); }}>
                      Clear
                    </Button>
                  </FormField>
                )}
              </div>}
            {filteredPlannedDates.length !== 0 &&
              <CountPill1 $variant={false}>
                <Pill $variant={true} />: <strong>Matched With Plan Resource</strong> &nbsp;&nbsp; <Pill $variant={false} />: <strong>Not Matched With Plan Resource</strong>
              </CountPill1>}

          </div>

          {filteredPlannedDates.length !== 0 && <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(180px, 240px))",
              gap: "1rem",
              margin: "0.75rem 0 1rem",
            }}
          >
            {plannedTL !== 0 && <FormField>
              <FormLabel>TL Contract Rate</FormLabel>

              <FormInput
                type="number"
                min="0"
                value={tlContractRate}
                placeholder="Enter TL contract rate"
                disabled={true}
              // onChange={(e) => setTlContractRate(e.target.value)}
              />
            </FormField>}

            {plannedEX !== 0 && <FormField>
              <FormLabel>EX Contract Rate</FormLabel>

              <FormInput
                type="number"
                min="0"
                value={exContractRate}
                placeholder="Enter EX contract rate"
                disabled={true}
              // onChange={(e) => setExContractRate(e.target.value)}
              />
            </FormField>}
          </div>}

          {isLoading ? (
            <EmptyRow style={{ fontSize: "1rem", padding: "2rem" }}>
              Loading resource data...
            </EmptyRow>
          ) : filteredPlannedDates.filter(({ d }) => d instanceof Date && !isNaN(d)).length === 0 ? (
            <EmptyRow style={{ fontSize: "1rem", padding: "2rem" }}>
              No resource allocated
            </EmptyRow>
          ) : (
            filteredPlannedDates
              .filter(({ d }) => d instanceof Date && !isNaN(d))   // ADD — drop any invalid entries before mapping
              .map(({ d, dStr }) => {
                // const dStr = formatToApiDate(d);
                const planAssignments = dateWiseAssignments[dStr] || [];
                const tlCount = planAssignments.filter((a) => a.emp_type === 'T').length;
                const exCount = planAssignments.filter((a) => a.emp_type === 'E').length;

                // console.log("planAssignments", JSON.stringify(planAssignments))

                const actualResourcesForDate = resourceList.filter((row) => {
                  if (!row?.s_date || !row?.e_date) return false;

                  const currentDate = DateForApiFormate(dStr, true);
                  const startDate = DateForApiFormate(row.s_date, true);
                  const endDate = DateForApiFormate(row.e_date, true);

                  return (
                    currentDate &&
                    startDate &&
                    endDate &&
                    currentDate >= startDate &&
                    currentDate <= endDate
                  );
                }).map((row) => ({
                  ...row,

                  // normalize for ActualEditRow
                  rowKey: `api-${row.id}-${row.allocation_id}-${dStr}`,
                  original_emp_id: row.emp_id,

                  emp_id: row.emp_id,
                  employee_name: row.employee_name,
                  emp_type: row.emp_type,
                  remarks: row.remarks || "",
                  contract_rate: row.contract_rate || 0,

                  // preserve API flags
                  is_approved: Boolean(row.is_approved),
                  is_present: Boolean(row.is_present),
                  is_active: Boolean(row.is_active),

                  // useful later for update API
                  allocation_id: row.allocation_id,
                  resource_id: row.id,
                }));

                const hasResourceActual = actualResourcesForDate.length > 0;
                const isDateBeingEdited = actualResourcesForDate.some((r) => editedApiRowKeys.has(r.rowKey));

                const isStarted = startedDates.has(dStr) || hasResourceActual;

                // const actualEntry = allAEntries.find((entry) => entry.start_date === dStr) || null;
                // const actualResources = parseActualResources(actualEntry);

                const actualDraft = actualDraftsByDate[dStr];
                const actualRows = actualDraft?.rows || [];
                const draftRowsByKey = new Map(actualRows.map((r) => [r.rowKey, r]));

                //             const displayedActualRows = hasResourceActual
                // ? [
                //     ...actualResourcesForDate,
                //     ...actualRows.filter(
                //       (draftRow) =>
                //         !actualResourcesForDate.some(
                //           (apiRow) =>
                //             apiRow.emp_id === draftRow.emp_id &&
                //             apiRow.start_date === draftRow.start_date &&
                //             apiRow.end_date === draftRow.end_date
                //         )
                //     ),
                //   ]
                // : actualRows;
                // const displayedActualRows = (hasResourceActual
                //   ? [
                //     ...actualResourcesForDate.map((apiRow) => draftRowsByKey.get(apiRow.rowKey) || apiRow),
                //     ...actualRows.filter(
                //       (draftRow) => !actualResourcesForDate.some((apiRow) => apiRow.rowKey === draftRow.rowKey)
                //     ),
                //   ]
                //   : actualRows).filter((r) => !r.is_deleted);

                const displayedActualRows = (() => {
                  if (!hasResourceActual) {
                    return actualRows; // pure draft (no API rows yet)
                  }

                  // Once a draft exists we treat the draft as the source of truth.
                  // Any API row whose rowKey is no longer in the draft is considered removed.
                  if (actualDraft && Array.isArray(actualDraft.rows)) {
                    const draftKeys = new Set(actualDraft.rows.map((r) => r.rowKey));

                    const fromApiStillPresent = actualResourcesForDate
                      .filter((apiRow) => draftKeys.has(apiRow.rowKey))
                      .map((apiRow) => draftRowsByKey.get(apiRow.rowKey) || apiRow);

                    const pureDraftRows = actualRows.filter(
                      (draftRow) => !actualResourcesForDate.some((apiRow) => apiRow.rowKey === draftRow.rowKey)
                    );

                    return [...fromApiStillPresent, ...pureDraftRows];
                  }

                  // No draft yet → show pure API rows
                  return actualResourcesForDate;
                })();

                const actualTlCount = displayedActualRows.filter((a) => a.emp_type === 'T').length;
                const actualExCount = displayedActualRows.filter((a) => a.emp_type === 'E').length;

                const planEmpIds = new Set(planAssignments.map((a) => a.emp_id));

                const isPlannedFromApi = planAssignments.some((row) => row.status === "ORIGINAL");

                const planTotal = planAssignments.reduce(
                  (sum, r) => sum + (Number(r.contract_rate) || 0),
                  0
                );
                // const actualTotal = actualResources.reduce((sum, r) => sum + (Number(r.rate) || 0),0);
                // const actualTotal = actualRows.reduce((sum, r) => sum + (Number(r.contract_rate) || 0), 0);
                const actualTotal = displayedActualRows.reduce((sum, r) => sum + (Number(r.contract_rate) || 0), 0); // FIXED — total must match what's rendered

                const claims = getDummyClaims(dStr);
                const claimsTotal = claims.reduce((sum, c) => sum + (Number(c.amount) || 0), 0);
                const grandTotal = planTotal + claimsTotal;

                const hasActual = allAEntries.some((entry) => entry.start_date === dStr);

                const matchedPlanRequiredResource = plannedTL === tlCount && plannedEX === exCount;
                const matchedActualRequiredResource = plannedTL === actualTlCount && plannedEX === actualExCount;

                const hasActualForDate = (dStr) =>
                  resourceList.some((row) => {
                    const currentDate = DateForApiFormate(dStr, true);
                    const startDate = DateForApiFormate(row.s_date, true);
                    const endDate = DateForApiFormate(row.e_date, true);
                    return currentDate && startDate && endDate && currentDate >= startDate && currentDate <= endDate;
                  });

                const sortedPlannedDates = filteredPlannedDates
                  .filter(({ d }) => d instanceof Date && !isNaN(d))
                  .sort((a, b) => a.d - b.d);

                const nextStartableDate = sortedPlannedDates.find(({ dStr }, idx) => {
                  if (startedDates.has(dStr) || hasActualForDate(dStr)) return false; // already started/filled, skip
                  const priorDates = sortedPlannedDates.slice(0, idx);
                  const allPriorFilled = priorDates.every(({ dStr: priorStr }) => hasActualForDate(priorStr));
                  return allPriorFilled;
                })?.dStr;

                return (
                  <DateBlock key={dStr}>
                    {/* Date header */}
                    <DateHeader>
                      <HeaderDate>
                        {d instanceof Date && !isNaN(d)
                          ? d.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' }).toUpperCase()
                          : dStr}
                      </HeaderDate>

                      <div style={{ display: "flex", gap: "0.5rem" }}>

                        {!matchedPlanRequiredResource && <CountPill1 $variant={true}>
                          Required (TL: <strong>{plannedTL}</strong> &nbsp;&nbsp; EX: <strong>{plannedEX}</strong>)
                        </CountPill1>}

                        <CountPill $variant={matchedPlanRequiredResource}>
                          Plan (TL: <strong>{tlCount}</strong> &nbsp;&nbsp; EX: <strong>{exCount}</strong>)
                        </CountPill>
                      </div>

                    </DateHeader>


                    {/* Plan / Actual */}
                    <Section>
                      <SectionTitle>Resource Details</SectionTitle>

                      <PlanActualGrid>
                        {/* PLAN */}
                        <SubPanel>
                          <SubPanelHeader $variant="plan" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span>Plan</span>

                            <CountPill $variant={matchedPlanRequiredResource}>
                              TL: <strong>{tlCount}</strong> &nbsp;&nbsp; EX: <strong>{exCount}</strong>
                            </CountPill>

                            {!isPastActivityWindow && !isStarted && isPlannedFromApi && (dStr === nextStartableDate && apiDate >= DateForApiFormate(nextStartableDate)) && (
                              <Button size="sm" variant="primary" onClick={() => openConfirmation({
                                title: "Start Activity",
                                message: `Are you sure you want to start the activity for ${dStr}?`,
                                confirmLabel: "Start",
                                onConfirm: () => handleStartActivity(dStr),
                                reload: true,
                              })}>
                                Start Activity
                              </Button>
                            )}

                            {isStarted && !hasResourceActual && !actualDraft && !isDateBeingEdited && planAssignments.length > 0 && (
                              <Button size="sm" variant="outline" onClick={() => handleCopyActual(dStr, planAssignments)}>
                                <LuCopy /> Copy Actual
                              </Button>
                            )}

                            {isStarted && actualDraft && !actualDraft.confirmed && (
                              <Button size="sm" variant="outlines" onClick={() => handleCancelCopyActual(dStr)}>
                                Cancel Copy Actual
                              </Button>
                            )}
                          </SubPanelHeader>

                          {planAssignments.length === 0 ? (
                            <EmptyRow>No resources planned</EmptyRow>
                          ) : (
                            planAssignments.map((row) => {
                              const disableAction = row.is_approved || activityData?.allAEntries?.length;
                              const isEditing = editingId === row.rowKey;

                              if (isEditing) {
                                return (
                                  <InlineEditForm
                                    key={row.rowKey}
                                    row={row}
                                    onChange={handleFieldChange}
                                    onConfirm={handleConfirmUpdate}
                                    onCancel={handleCancelEdit}
                                    activityStart={activityStart}
                                    activityEnd={activityEnd}
                                    openConfirmation={openConfirmation}
                                    tlContractRate={tlContractRate}
                                    exContractRate={exContractRate}
                                  />
                                );
                              }

                              return (
                                <ResourceRow key={row.rowKey}>
                                  <ResourceInfo>
                                    <ResourceName>
                                      {row.employee_name || row.emp_id}<span style={{ color: theme.colors.textLight }}>({row.emp_id})</span>
                                      {row.action === "ADD" && <Badge variant="warning" style={{ fontSize: '0.58rem' }}>New</Badge>}
                                      {row.action === "UPDATE" && <Badge variant="info" style={{ fontSize: '0.58rem' }}>Updated</Badge>}
                                      {row.is_approved && <Badge variant="success" style={{ fontSize: '0.58rem' }}>Approved</Badge>}
                                    </ResourceName>
                                    <ResourceMeta>
                                      <Badge variant={row.emp_type === 'T' ? 'forward' : 'info'} style={{ fontSize: '0.6rem' }}>
                                        {formatEmpType(row.emp_type)}
                                      </Badge>
                                      <span>{row.start_date || '—'} to {row.end_date || '—'}</span>
                                      {row.remarks && <span>· {row.remarks}</span>}
                                    </ResourceMeta>
                                  </ResourceInfo>
                                  <RateActionsCol>
                                    <RateTag>
                                      ₹{Number(row.contract_rate) > 0 ? row.contract_rate : row.emp_type === "T" ? tlContractRate || 0 : exContractRate || 0}
                                    </RateTag>
                                    {/* <RowActions onClick={(e) => e.stopPropagation()}>
                                      <Button iconOnly variant="primary" title="Edit" disabled={disableAction} onClick={() => handleEditDate(row, dStr)}>
                                        <FaEdit size={11} />
                                      </Button>
                                      <Button iconOnly variant="outlines" title="Remove" disabled={disableAction} onClick={() => handleDeleteDate(row, dStr)}>
                                        <FaTrash size={11} />
                                      </Button>
                                    </RowActions> */}
                                  </RateActionsCol>
                                </ResourceRow>
                              );
                            })
                          )}

                          {/* MOVED OUT of the ternary/map — renders regardless of planAssignments length */}
                          {displayedActualRows
                            .filter(
                              (r, index, arr) =>
                                !planEmpIds.has(r.emp_id) &&
                                arr.findIndex((x) => x.emp_id === r.emp_id) === index
                            )
                            .map((r) => (
                              <ResourceRow key={`extra-${r.rowKey}`} style={{ opacity: 0.6 }}>
                                <ResourceInfo>
                                  <ResourceName>
                                    {r.employee_name || r.emp_id}
                                    <Badge variant="warning" style={{ fontSize: "0.58rem" }}>Not planned for this date</Badge>
                                  </ResourceName>
                                </ResourceInfo>
                              </ResourceRow>
                            ))}

                          <TotalsBar style={{ marginTop: 10 }}>
                            <span>Plan Total: ₹{planTotal}</span>
                            {/* <span>Actual Total: ₹{actualTotal}</span> */}
                          </TotalsBar>
                        </SubPanel>

                        {/* ACTUAL */}
                        {/* <SubPanel>
                        <SubPanelHeader $variant="actual">Actual</SubPanelHeader>
                        {actualResources.length === 0 ? (
                          <EmptyRow>No actual data recorded</EmptyRow>
                        ) : (
                          actualResources.map((res, idx) => {
                            const isReplaced = !planEmpIds.has(res.emp_id);
                            return (
                              <ResourceRow key={`${res.emp_id}-${idx}`}>
                                <ResourceInfo>
                                  <ResourceName>
                                    {res.name || res.emp_id}
                                    {isReplaced && <Badge variant="warning" style={{ fontSize: '0.58rem' }}>Replaced</Badge>}
                                  </ResourceName>
                                  <ResourceMeta>
                                    <Badge variant={res.emp_type === 'T' ? 'forward' : 'info'} style={{ fontSize: '0.6rem' }}>
                                      {formatEmpType(res.emp_type)}
                                    </Badge>
                                  </ResourceMeta>
                                </ResourceInfo>
                                <RateActionsCol>
                                  <RateTag>{res.rate != null ? `₹${res.rate}` : '—'}</RateTag>
                                </RateActionsCol>
                              </ResourceRow>
                            );
                          })
                        )}
                      </SubPanel> */}
                        <SubPanel>
                          <SubPanelHeader
                            $variant="actual"
                            style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                          >
                            <span>Actual</span>

                            <CountPill $variant={matchedActualRequiredResource}>
                              TL: <strong>{actualTlCount}</strong> &nbsp;&nbsp; EX: <strong>{actualExCount}</strong>
                            </CountPill>
                          </SubPanelHeader>

                          {displayedActualRows.length === 0 && (
                            <EmptyRow>No actual data recorded</EmptyRow>
                          )}

                          {displayedActualRows.map((row) => {
                            const disableActualAction = row.is_present === true;

                            const alreadyAllocatedEmpIds = new Set(
                              displayedActualRows
                                .filter((r) => !r.is_deleted)
                                .map((r) => r.emp_id)
                                .filter(Boolean)
                            );

                            return (
                              <ActualEditRow
                                key={row.rowKey}
                                row={row}
                                employees={employees}
                                busyDateMap={busyDateMap}
                                dStr={dStr}
                                alreadyAllocatedEmpIds={alreadyAllocatedEmpIds}
                                onSave={hasResourceActual && (row.source === "api" || row.resource_id != null) ? () => handleSaveApiRowEdit(row.rowKey) : undefined}
                                // onCancel={hasResourceActual ? () => handleCancelApiRowEdit(dStr, row.rowKey, actualResourcesForDate.find((r) => r.rowKey === row.rowKey)) : undefined}
                                onCancel={hasResourceActual
                                  ? () => {
                                    // API row → restore original values (Undo)
                                    if (row.source === "api" || row.resource_id != null) {
                                      handleCancelApiRowEdit(dStr, row.rowKey, actualResourcesForDate.find((r) => r.rowKey === row.rowKey));
                                    } else {
                                      // Brand-new row that was never saved → just remove it
                                      handleRemoveActualRow(dStr, row.rowKey);
                                    }
                                  }
                                  : undefined
                                }
                                readOnly={!actualDraft || actualDraft.confirmed}
                                isReplaced={
                                  hasResourceActual
                                    ? !planEmpIds.has(row.emp_id)
                                    : row.original_emp_id != null && row.emp_id !== row.original_emp_id
                                }
                                minActualDate={DateForApiFormate(minActualDate, true)}
                                maxActualDate={DateForApiFormate(maxActualDate, true)}
                                onFieldChange={(field, value) => {
                                  if (disableActualAction) return;
                                  handleActualFieldChange(dStr, row.rowKey, field, value);
                                  if (field === "emp_type") {
                                    let matchedRate = null;
                                    for (const dateKey of Object.keys(dateWiseAssignments)) {
                                      const match = (dateWiseAssignments[dateKey] || []).find((r) => r.emp_type === value && r.contract_rate);
                                      if (match) { matchedRate = match.contract_rate; break; }
                                    }
                                    const finalRate = matchedRate || getContractRateByType(value);
                                    handleActualFieldChange(dStr, row.rowKey, "contract_rate", finalRate);
                                  }
                                }}
                                disableActualAction={disableActualAction}
                                onEmployeeChange={(emp_id) => {
                                  if (disableActualAction) return;
                                  handleActualEmployeeChange(dStr, row.rowKey, emp_id);
                                }}
                                onToggleEdit={undefined}
                                onRemove={() => handleRemoveActualRow(dStr, row.rowKey)}
                              />
                            );
                          })}

                          {!isStatusApproved &&
                            actualDraft &&
                            !actualDraft.confirmed && (
                              <div
                                style={{
                                  display: "flex",
                                  gap: "0.5rem",
                                  justifyContent: "flex-end",
                                  padding: "8px 10px",
                                }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAddActualRow(dStr)}
                                >
                                  <FaUserPlus /> Add resource
                                </Button>

                                {actualDraft.rows.length > 0 && (
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleConfirmActual(dStr)}
                                  >
                                    <FaUserCheck /> Confirm
                                  </Button>
                                )}
                              </div>
                            )}

                          {/* Date-level Edit button (not per-resource) when status is not Approved */}
                          {(activityData?.original_P?.status !== "A" ||
                            activityData?.original_A?.status !== "A") &&
                            (hasResourceActual || (actualDraft?.rows?.length > 0)) && (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "8px 10px",
                                }}
                              >
                                {(!actualDraft || actualDraft.confirmed) ? (
                                  <>
                                    <Badge variant="success" style={{ fontSize: "0.6rem" }}>
                                      Confirmed
                                    </Badge>
                                    <Button
                                      size="sm"
                                      variant="outlines"
                                      onClick={() => handleEditActualAgain(dStr)}
                                    >
                                      Edit
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Badge variant="warning" style={{ fontSize: "0.6rem" }}>
                                      Editing
                                    </Badge>
                                    <Button
                                      size="sm"
                                      variant="outlines"
                                      onClick={() => {
                                        setActualDraftsByDate((prev) => {
                                          const draft = prev[dStr];
                                          if (!draft) return prev;

                                          const baseline = draft.baselineRows || [];

                                          // Keep only rows that the user has explicitly clicked Save on
                                          const savedRowsFromCurrent = (draft.rows || []).filter((r) =>
                                            savedApiEditKeys.has(r.rowKey)
                                          );

                                          // Start from the clean baseline, then overlay any saved rows
                                          const baselineMap = new Map(baseline.map((r) => [r.rowKey, { ...r }]));
                                          savedRowsFromCurrent.forEach((r) => {
                                            baselineMap.set(r.rowKey, { ...r }); // saved version wins
                                          });

                                          // Also drop any brand-new rows that were never saved
                                          const restoredRows = Array.from(baselineMap.values()).filter((r) => {
                                            // keep API rows that were in baseline, plus any saved new rows
                                            return r.source === "api" || r.resource_id != null || savedApiEditKeys.has(r.rowKey);
                                          });

                                          return {
                                            ...prev,
                                            [dStr]: {
                                              ...draft,
                                              confirmed: true,
                                              rows: restoredRows,
                                              // clear baseline after cancel (optional, keeps state clean)
                                              baselineRows: undefined,
                                            },
                                          };
                                        });
                                      }}
                                    >
                                      Cancel Edit
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          <TotalsBar style={{ marginTop: 10 }}>
                            <span>Actual Total: ₹{actualTotal}</span>
                          </TotalsBar>
                        </SubPanel>
                      </PlanActualGrid>
                    </Section>

                    <ButtonRows>

                    </ButtonRows>
                  </DateBlock>
                );
              })
          )}
        </ScrollableTableWrapper>
        {hasAnyActivityStarted && hasUserActualChanges && (
          <ButtonRows style={{ marginTop: "1rem", justifyContent: "flex-end" }}>
            <Button variant="primary" onClick={() =>
              openConfirmation({
                title: "Submit Actuals",
                message: "Are you sure you want to submit actual allocations?",
                confirmLabel: "Submit",
                onConfirm: handleSubmitAllActuals,
                reload: true,
              })
            }
            >
              Submit Actuals
            </Button>
          </ButtonRows>
        )}
      </Card>


      {isActualRangeModalOpen && <AddActualModal
        isOpen={isActualRangeModalOpen}
        onClose={(e) => { setIsActualRangeModalOpen(false); e.stopPropagation() }}
        employees={employees}
        minActualDate={minActualDate}
        maxActualDate={maxActualDate}
        onSave={handleSaveActualRange}
        isUpdateMode={isUpdateMode}
        getContractRateByType={getContractRateByType}
        dateWiseAssignments={dateWiseAssignments}
        busyDateMap={busyDateMap}
      />}

      <ConfirmPopup
        isOpen={confirmationModal.isOpen}
        onClose={closeConfirmation}
        isLoading={confirmationModal.loading}
        onConfirm={handleConfirmation}
        title={confirmationModal.title}
        message={confirmationModal.message}
        confirmLabel={confirmationModal.confirmLabel}
      />
    </>
  );
};

export default CurrentAssignments;

const EditRowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors?.backgroundAlt || '#f9f9fa'};
  border-radius: 6px;
  border: 1px dashed ${({ theme }) => theme.colors?.border || '#e5e7eb'};
  margin: 0.5rem 0;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const FormLabel = styled.label`
  font-size: 0.6rem;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.textLight || '#666'};
`;

const FormInput = styled.input`
  padding: 0.25rem 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ccc'};
  border-radius: 4px;
  font-size: 0.7rem;
  background: ${({ theme }) => theme.colors?.card || '#fff'};
  color: ${({ theme }) => theme.colors?.text || '#333'};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors?.primary || '#6C5CE7'};
  }
`;

const FormSelect = styled.select`
  padding: 0.25rem 0.4rem;
  border: 1px solid ${({ theme }) => theme.colors?.border || '#ccc'};
  border-radius: 4px;
  font-size: 0.7rem;
  background: ${({ theme }) => theme.colors?.card || '#fff'};
  color: ${({ theme }) => theme.colors?.text || '#333'};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors?.primary || '#6C5CE7'};
  }
`;

const InlineEditForm = ({ row, onChange, onConfirm, onCancel, activityStart, activityEnd, openConfirmation, tlContractRate, exContractRate, }) => {
  const formattedStart = activityStart ? DateForApiFormate(activityStart, true) : "";
  const formattedEnd = activityEnd ? DateForApiFormate(activityEnd, true) : "";

  return (
    <EditRowContainer onClick={(e) => e.stopPropagation()}>
      <FormField>
        <FormLabel>Start Date</FormLabel>
        <FormInput
          type="date"
          min={formattedStart}
          max={formattedEnd}
          value={row.start_date || ""}
          onChange={(e) => onChange(row.rowKey, "start_date", e.target.value)}
          disabled
        />
      </FormField>
      <FormField>
        <FormLabel>End Date</FormLabel>
        <FormInput
          type="date"
          min={formattedStart}
          max={formattedEnd}
          value={row.end_date || ""}
          onChange={(e) => onChange(row.rowKey, "end_date", e.target.value)}
          disabled
        />
      </FormField>
      <FormField>
        <FormLabel>Employee Type</FormLabel>
        <FormSelect
          value={row.emp_type || "E"}
          onChange={(e) => {
            const empType = e.target.value;

            onChange(row.rowKey, "emp_type", empType);
            onChange(
              row.rowKey,
              "contract_rate",
              empType === "T" ? tlContractRate : exContractRate
            );
          }}
        >
          <option value="E">Executive (EX)</option>
          <option value="T">Team Lead (TL)</option>
        </FormSelect>
      </FormField>

      <FormField>
        <FormLabel>Contract Rate</FormLabel>
        <FormInput
          type="number"
          value={row.emp_type === "T" ? tlContractRate : exContractRate}
          disabled
        />
      </FormField>

      <FormField style={{ gridColumn: "span 2" }}>
        <FormLabel>Remarks</FormLabel>
        <FormInput
          type="text"
          value={row.remarks || ""}
          placeholder="Remarks"
          onChange={(e) => onChange(row.rowKey, "remarks", e.target.value)}
        />
      </FormField>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
        <Button size="small" variant="successGhost" onClick={() =>
          openConfirmation({
            title: "Update Resource",
            message: "Are you sure you want to update this resource?",
            confirmLabel: "Update",
            onConfirm: () => onConfirm(row.rowKey),
          })
        }>
          Confirm
        </Button>
        <Button size="small" variant="outlines" onClick={() => onCancel(row.rowKey)}>
          Cancel
        </Button>
      </div>
    </EditRowContainer>
  );
};

const ActualEditRow = ({ row, employees, readOnly, isReplaced, onFieldChange, onEmployeeChange, onRemove, disableActualAction, onToggleEdit, onSave, onCancel, minActualDate, maxActualDate, busyDateMap = {}, dStr,
  alreadyAllocatedEmpIds = new Set(),
}) => {
  const initialRef = useRef(null);

  if (!readOnly && initialRef.current === null) {
    initialRef.current = {
      emp_id: row.emp_id,
      emp_type: row.emp_type,
      start_date: row.start_date || row.s_date || "",
      end_date: row.end_date || row.e_date || "",
      remarks: row.remarks || "",
      contract_rate: row.contract_rate,
      a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
      employee_name: row.employee_name || "",
    };
  }

  const isDirty = (() => {
    if (!initialRef.current || readOnly) return false;

    const orig = initialRef.current;
    const currStart = row.start_date || row.s_date || "";
    const currEnd = row.end_date || row.e_date || "";

    return (
      row.emp_id !== orig.emp_id ||
      row.emp_type !== orig.emp_type ||
      currStart !== orig.start_date ||
      currEnd !== orig.end_date ||
      (row.remarks || "") !== (orig.remarks || "") ||
      Number(row.contract_rate) !== Number(orig.contract_rate) ||
      Number(row.a_quanity ?? row.a_quantity ?? 0) !== Number(orig.a_quanity ?? orig.a_quantity ?? 0) ||
      (row.employee_name || "") !== (orig.employee_name || "")
    );
  })();

  // After a successful Save we re-baseline so isDirty becomes false and Save disappears
  const handleSaveClick = () => {
    if (onSave) onSave();
    initialRef.current = {
      emp_id: row.emp_id,
      emp_type: row.emp_type,
      start_date: row.start_date || row.s_date || "",
      end_date: row.end_date || row.e_date || "",
      remarks: row.remarks || "",
      contract_rate: row.contract_rate,
      a_quanity: Number(row.a_quanity ?? row.a_quantity ?? 0) || 0,
      employee_name: row.employee_name || "",
    };
  };


  if (readOnly) {
    return (
      <ResourceRow>
        <ResourceInfo>
          <ResourceName>
            {row.employee_name || row.emp_id}
            {isReplaced && <Badge variant="info" style={{ fontSize: '0.58rem' }}>Add</Badge>}
            {row.a_quanity != null && row.a_quanity !== "" && row.a_quanity !== 0 && (
              <span style={{ fontSize: '0.7rem', color: theme.colors.textLight }}>(Qty: {row.a_quanity})</span>
            )}
          </ResourceName>
          <ResourceMeta>
            <Badge variant={row.emp_type === 'T' ? 'forward' : 'info'} style={{ fontSize: '0.6rem' }}>
              {row.emp_type === 'T' ? 'TL' : 'EX'}
            </Badge>
            <span>{row.start_date || row.s_date || '—'} to {row.end_date || row.e_date || '—'}</span>
            {row.remarks && <span>· {row.remarks}</span>}
          </ResourceMeta>
        </ResourceInfo>
        <RateActionsCol>
          <RateTag>{row.contract_rate != null ? `₹${row.contract_rate}` : '—'}</RateTag>
          {!disableActualAction && onToggleEdit && (
            <Button size="sm" variant="outlines" onClick={onToggleEdit}>Edit</Button>
          )}
        </RateActionsCol>
      </ResourceRow>
    );
  }

  const getStartDateField = (row) => row.start_date ? 'start_date' : 's_date';
  const getEndDateField = (row) => row.end_date ? 'end_date' : 'e_date';

  return (
    <>
      <EditRowContainer>
        <FormField>
          <FormLabel>Resource {isReplaced && <Badge variant="warning" style={{ fontSize: '0.55rem' }}>Replaced</Badge>}</FormLabel>
          {employees.length > 0 ? (
            <FormSelect value={row.emp_id} onChange={(e) => onEmployeeChange(e.target.value)} disabled={row.source === "api"}>
              {employees.filter((emp) => emp.is_active !== false && emp.is_active !== 0 && emp.is_active !== "false") // ADDED
                .filter((emp) => emp.emp_id === row.emp_id || !busyDateMap[emp.emp_id]?.[DateForApiFormate(row.start_date || row.s_date || dStr, true)]) // ADDED — keep current selection visible, hide others with allocation on this date
                .filter((emp) => {
                  if (emp.emp_id === row.emp_id) return true;

                  if (alreadyAllocatedEmpIds.has(emp.emp_id)) return false;

                  const dateKey = DateForApiFormate(row.start_date || row.s_date || dStr, true);
                  if (busyDateMap[emp.emp_id]?.[dateKey]) return false;

                  return true;
                })
                .map((emp) => (
                  <option key={emp.emp_id} value={emp.emp_id}>{emp.name}</option>
                ))}
            </FormSelect>
          ) : (
            <FormInput
              type="text"
              value={row.employee_name}
              onChange={(e) => onFieldChange("employee_name", e.target.value)}
              disabled={row.source === "api"}
            />
          )}
        </FormField>

        <FormField>
          <FormLabel>Employee Type</FormLabel>
          <FormSelect value={row.emp_type} onChange={(e) => onFieldChange("emp_type", e.target.value)}>
            <option value="E">Executive (EX)</option>
            <option value="T">Team Lead (TL)</option>
          </FormSelect>
        </FormField>

        <FormField>
          <FormLabel>Start Date</FormLabel>
          <FormInput
            type="date"
            min={minActualDate}
            max={maxActualDate}
            value={DateForApiFormate(row.start_date || row.s_date || "", true)}
            onChange={(e) => onFieldChange(getStartDateField(row), e.target.value)}
            disabled
          />
        </FormField>

        <FormField>
          <FormLabel>End Date</FormLabel>
          <FormInput
            type="date"
            min={row.start_date || minActualDate}
            max={maxActualDate}
            value={DateForApiFormate(row.end_date || row.e_date || "", true)}
            onChange={(e) => onFieldChange(getEndDateField(row), e.target.value)}
            disabled
          />
        </FormField>

        <FormField>
          <FormLabel>Contract Rate</FormLabel>
          <FormInput
            type="number"
            value={row.contract_rate ?? ""}
            disabled
          />
        </FormField>

        <FormField>
          <FormLabel>No of items / scans</FormLabel>
          <FormInput
            type="number"
            min="0"
            step="1"
            value={row.a_quanity ?? ""}
            onChange={(e) => onFieldChange("a_quanity", e.target.value === "" ? 0 : Number(e.target.value))}
          />
        </FormField>

        <FormField style={{ gridColumn: "span 2" }}>
          <FormLabel>Remarks</FormLabel>
          <FormInput
            type="text"
            value={row.remarks}
            placeholder="Remarks"
            onChange={(e) => onFieldChange("remarks", e.target.value)}
          />
        </FormField>

      </EditRowContainer>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
        {onSave && isDirty && (
          <Button size="sm" variant="success" onClick={handleSaveClick}>Save</Button>
        )}
        {onCancel && isDirty && <Button size="sm" variant="outlines" onClick={onCancel}>Cancel</Button>}
        <Button size="sm" variant="outlines" onClick={onRemove}> <FaUserSlash /> Remove</Button>
      </div>
    </>
  );
};

const RenderButton = ({ activityStarted, handleStartActivity, handleCopyAllActual, handleCancelCopyAllActual, hasUnconfirmedDrafts, handleOpenActualRangeModal }) => {

  // if (!activityStarted) {
  //   return (
  //     <ButtonRows>
  //       <Button size="sm" variant="primary" onClick={() => handleStartActivity(dStr)}>
  //         Start Activity
  //       </Button>    
  //     </ButtonRows>
  //   );
  // }

  return (
    <ButtonRows>
      {!hasUnconfirmedDrafts &&
        <Button size="sm" variant="primary" onClick={() => handleCopyAllActual()}>
          <LuCopyPlus /> Copy Actual (All Dates)
        </Button>}

      {hasUnconfirmedDrafts && (
        <Button size="sm" variant="outlines" onClick={() => handleCancelCopyAllActual()}>
          Cancel Copy Actual
        </Button>
      )}

      <Button size="sm" variant="outline" onClick={() => handleOpenActualRangeModal()}>
        {/* {hasActual ? "Update Actual" : "Add Actual"} */}
        <FaPlus /> Add Actual
      </Button>

    </ButtonRows>
  )
}
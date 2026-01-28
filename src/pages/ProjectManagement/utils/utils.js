const MONTH_SHORT_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric'});
    } catch (error) {
      return 'Invalid Date';
    }
  };

const MONTH_MAP = MONTH_SHORT_NAMES.reduce((acc, m, i) => {
    acc[m.toLowerCase()] = i;
    return acc;
}, {});

const parseApiDate = (apiDateStr) => {
    if (!apiDateStr || typeof apiDateStr !== "string") return null;
    const parts = apiDateStr.split("-");
    if (parts.length !== 3) return null;
    const dd = parseInt(parts[0], 10);
    const mon = parts[1];
    const yyyy = parseInt(parts[2], 10);
    const monthIndex = MONTH_MAP[mon.toLowerCase()];
    if (isNaN(dd) || isNaN(monthIndex) || isNaN(yyyy)) return null;
    // Create date in local timezone
    return new Date(yyyy, monthIndex, dd, 0, 0, 0, 0);
};

export const formatToApiDate = (d) => {
    if (!(d instanceof Date)) return null;
    const dd = String(d.getDate()).padStart(2, "0");
    const mon = MONTH_SHORT_NAMES[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${dd}-${mon}-${yyyy}`;
};

export const formatAPITime = (time24) => {
  if (!time24) return ""
  const [h, m] = time24.split(":")
  let hours = parseInt(h, 10)
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12
  return `${hours.toString().padStart(2, "0")}:${m} ${ampm}`
}

export const getTodayApiDateStr = () => {
    const d = new Date();
    return formatToApiDate(d);
};

const parseISO = (iso) => {
  if (!iso) return null
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

//this below function formate date in this way 👉 "18 Jan – 24 Jan, 2026"
export const formatWeekLabel = (startISO, endISO) => {
  const start = parseISO(startISO)
  const end = parseISO(endISO)
  if (!start || !end) return ""

  const startDay = start.getDate()
  const endDay = end.getDate()
  const month = MONTH_SHORT_NAMES[start.getMonth()]
  const year = start.getFullYear()

  return `${startDay} ${month} – ${endDay} ${month}, ${year}`
}

//this below function formate date in this way 👉 "January 2026"
export const formatMonthLabel = (startISO) => {
  if (!startISO) return ""
  const d = parseISO(startISO)
  if (!d) return ""

  return `${d.toLocaleString("en-US", { month: "long" })} ${d.getFullYear()}`
}

const isDateInRange = (apiDateStr, startApi, endApi) => {
    const d = parseApiDate(apiDateStr);
    const s = parseApiDate(startApi);
    const e = parseApiDate(endApi);
    if (!d || !s || !e) return false;
    // compare only yyyy-mm-dd by zeroing time already done in parseApiDate
    return d.getTime() >= s.getTime() && d.getTime() <= e.getTime();
};

const parseGeoData = (geoString) => {
    if (!geoString || typeof geoString !== "string") {
        return { check_in: null, check_out: null };
    }

    // Split by 'O|' to get all pieces. First piece contains the "I|" info.
    const parts = geoString.split("O|");
    const checkInPart = parts[0] || "";
    const checkOutPart = parts.slice(1).pop() || ""; // take last O|... part (latest checkout if many)

    let check_in = null;
    let check_out = null;

    // Parse check in (strip leading 'I|' if present)
    if (checkInPart) {
        const inStr = checkInPart.startsWith("I|") ? checkInPart.slice(2) : checkInPart;
        const inParts = inStr.split("|").map(s => s === "" ? null : s);
        // Expect [time, lat, lng] but be defensive
        const time = inParts[0] || null;
        const lat = inParts[1] != null ? Number(inParts[1]) : null;
        const lng = inParts[2] != null ? Number(inParts[2]) : null;
        check_in = {
            time,
            lat: Number.isFinite(lat) ? lat : null,
            lng: Number.isFinite(lng) ? lng : null
        };
    }

    // Parse check out (we already took last out part)
    if (checkOutPart) {
        // checkOutPart may begin with a time (no leading O|)
        const outParts = checkOutPart.split("|").map(s => s === "" ? null : s);
        const time = outParts[0] || null;
        const lat = outParts[1] != null ? Number(outParts[1]) : null;
        const lng = outParts[2] != null ? Number(outParts[2]) : null;
        check_out = {
            time,
            lat: Number.isFinite(lat) ? lat : null,
            lng: Number.isFinite(lng) ? lng : null
        };
    }

    return { check_in, check_out };
};

const buildDayLogsFromAEntries = (aEntries = []) => {
  const dayLogs = {};
  const dateCounters = {}; // track section count per date

  if (!Array.isArray(aEntries) || aEntries.length === 0) return dayLogs;

  const sortedA = [...aEntries].sort((x, y) => (x.id || 0) - (y.id || 0));

  sortedA.forEach(aEntry => {
    const tsList = Array.isArray(aEntry.ts_data_list) ? aEntry.ts_data_list : [];

    const aEffort = typeof aEntry.effort === "number" ? aEntry.effort : 0;

    const aRemarks = typeof aEntry.remarks === "string" ? aEntry.remarks : "";

    tsList.forEach(ts => {
      const date = ts?.a_date;
      if (!date) return;

      // increment section counter
      dateCounters[date] = (dateCounters[date] || 0) + 1;
      const section = dateCounters[date];

      const logKey =
        section === 1 ? date : `${date} (session ${section})`;

      const { check_in, check_out } = parseGeoData(ts.geo_data || "");

      const tsNoOfItems = typeof ts.no_of_items === "number" ? ts.no_of_items : Number(ts.no_of_items || 0);
      const tsStatus = ts.status;

      const belongsToThisA = isDateInRange(
        date,
        aEntry.start_date,
        aEntry.end_date
      );

      dayLogs[logKey] = {
        date,
        section: logKey,
        check_in: check_in || "",
        check_out: check_out || "",
        remarks: ts?.remarks || aRemarks || "",
        effort: belongsToThisA ? aEffort : 0,
        no_of_items: belongsToThisA ? tsNoOfItems : 0,
        timeSheetStatus: tsStatus ? tsStatus : "",
      };
    });
  });

  return dayLogs;
};


export const buildActivityGroupMap = (apiData = []) => {
  if (!Array.isArray(apiData) || apiData.length === 0) return [];

  const groups = {}; 
  // key -> { key, original_P, allAEntries }

  // STEP 1: First index all P records
  apiData.forEach(item => {
    if (item.activity_type === "P") {
      const key = `${item.id}_${item.order_item_id}`;

      groups[key] = {
        key,
        original_P: item,
        allAEntries: []
      };
    }
  });

  // STEP 2: Attach A records to matching P
  apiData.forEach(item => {
    if (item.activity_type === "A") {
      const freeCodeId = Number(item.free_code); // string → number
      if (!freeCodeId) return;

      const key = `${freeCodeId}_${item.order_item_id}`;

      if (groups[key]) {
        groups[key].allAEntries.push(item);
      }
    }
  });

  // STEP 3: Derive original_A (highest id)
  return Object.values(groups).map(group => {
    const allA = group.allAEntries;

    const original_A =
      allA.length === 0
        ? null
        : allA.reduce((prev, curr) =>
            Number(curr.id) > Number(prev.id) ? curr : prev
          );

    return {
      key: group.key,
      original_P: group.original_P,
      original_A,
      allAEntries: allA
    };
  });
};


export const normalizeProjects = (apiData = []) => {
    const groups = buildActivityGroupMap(apiData);
    const todayApiStr = getTodayApiDateStr(); // e.g., "29-Nov-2025"

    // For each grouped item, build the final object following the specification exactly.
    const final = groups.map(group => {
        const P = group.original_P;
        const A = group.original_A;
        const allA = Array.isArray(group.allAEntries) ? group.allAEntries : [];

        // planned dates only from P
        const planned_start_date = P?.start_date || null;
        const planned_end_date = P?.end_date || null;
        const planned_start_time = P?.start_time || null;
        const planned_end_time = P?.end_time || null;

        // identity fields
        const customer_name = (P?.customer_name) || (A?.customer_name) || null;
        const audit_type = (P?.product_name) || (A?.product_name) || null;
        const activity_id = (P?.activity_id) || (A?.activity_id) || null;
        const order_item_key = (P?.order_item_key) || (A?.order_item_key) || null;
        const order_item_id = (P?.order_item_id) || (A?.order_item_id) || null;
        const project_name = (P?.project_name) || (A?.project_name) || null;
        const activity_name = (P?.activity_name) || (A?.activity_name) || null;

        // Build combined day_logs from ALL A entries (merging by date, latest geo wins)
        const day_logs = buildDayLogsFromAEntries(allA);

        const allDates = Object.keys(day_logs).map(d => parseApiDate(d)).filter(Boolean).sort((a, b) => a - b);

        //actual date from the day_logs
        const actual_start_date = allDates.length ? formatToApiDate(allDates[0]) : null;
        const actual_end_date = allDates.length ? formatToApiDate(allDates[allDates.length - 1]) : null;

        const total_no_of_items = Object.values(day_logs).reduce(
            (sum, d) => sum + (Number(d.no_of_items) || 0),
            0
        );

        // Total effort = sum of effort from ALL A entries (rule 5)
        const totalEffort = allA.reduce((sum, e) => {
            const v = typeof e.effort === "number" ? e.effort : 0;
            return sum + v;
        }, 0);

        // effort_unit: prefer any non-null effort_unit from original_A, else from first A, else null
        const effort_unit = (A && A.effort_unit) ? A.effort_unit :
            (allA.length > 0 && allA.find(a => a.effort_unit)?.effort_unit) || null;

        // Determine 'complete' as per rule: true only if original_A (highest id) has status === "S"
        // const complete = !!(A && A.status === "S");
        const complete = A?.status && A.status !== "N";

        // Determine project_period_status as per RULE 6
        // - "Completed" → if complete === true OR any A has status === "C" or status_display === "COMPLETED"
        // - "In Progress" → has at least one A, not completed
        // - "Pending" → only P exists AND planned_end_date < today
        // - "Planned" → only P exists AND within/future dates
        let project_period_status = "Planned";
        const anyAHasCompleted = allA.some(x => x && (x.status === "S" || (x.status_display && x.status_display.toUpperCase() === "SUBMITTED")));
        if (complete || anyAHasCompleted) {
            project_period_status = "Completed";
        } else if (allA && allA.length > 0) {
            project_period_status = "In Progress";
        } else if (P) {
            if (planned_end_date) {
                const end = parseApiDate(planned_end_date);
                const today = parseApiDate(todayApiStr);
                if (end && today && end.getTime() < today.getTime()) {
                    project_period_status = "Pending";
                } else {
                    project_period_status = "Planned";
                }
            } else {
                project_period_status = "Planned";
            }
        } else {
            // If neither P nor A exist (shouldn't happen), mark Pending by default
            project_period_status = "Pending";
        }

        // Today's status (for todayApiStr) as per RULE 6 (todaysStatus)
        // - "Complete" → has check-in + check-out today
        // - "Active" → has check-in today but no check-out
        // - "Planned" → no activity today
        const todayLog = day_logs[todayApiStr] || null;
        let todaysStatus = "Planned";
        if (todayLog && todayLog.check_in && todayLog.check_out) {
            todaysStatus = "Complete";
        } else if (todayLog && todayLog.check_in && !todayLog.check_out) {
            todaysStatus = "Active";
        } else {
            todaysStatus = "Planned";
        }

        // Pending checkout detection: any date with check_in but no check_out
        // const pendingDates = Object.keys(day_logs)
        //     .filter(d => {
        //         const l = day_logs[d];
        //         return !!(l && l.check_in && !l.check_out);
        //     })
        //     // sort dates ascending (by parsed date)
        //     .sort((a, b) => {
        //         const pa = parseApiDate(a);
        //         const pb = parseApiDate(b);
        //         if (!pa || !pb) return 0;
        //         return pa.getTime() - pb.getTime();
        //     });

        // const hasPendingCheckout = pendingDates.length > 0;
        // // pendingCheckoutDate: choose the earliest pending date (makes sense for UX). If none -> null
        // const pendingCheckoutDate = hasPendingCheckout ? pendingDates[0] : null;

        // Buttons logic as per RULE 7:
        // - If any date has check_in but no check_out -> hasPendingCheckout = true, show_end_button = true
        // - Else if today has no check_in -> show_start_button = true
        // - Else if today has check_in but no check_out -> show_end_button = true

        // ---- CORRECT PENDING CHECKOUT LOGIC ----

// Convert today's API date to real Date object
const todayObj = parseApiDate(todayApiStr);

// Find ANY previous date with check-in but NO check-out
const hasPreviousDatePendingCheckout = Object.keys(day_logs).some(dateStr => {
    const log = day_logs[dateStr];
    const d = parseApiDate(dateStr);

    if (!log || !d) return false;

    // Strictly BEFORE today
    const isPreviousDate = d.getTime() < todayObj.getTime();

    return isPreviousDate && log.check_in && !log.check_out;
});

// This is your final expected value
const hasPendingCheckout = hasPreviousDatePendingCheckout;

// Earliest previous pending date (optional)
const pendingCheckoutDate = hasPendingCheckout
    ? Object.keys(day_logs)
        .filter(dateStr => {
            const log = day_logs[dateStr];
            const d = parseApiDate(dateStr);

            if (!log || !d) return false;

            return d.getTime() < todayObj.getTime() && log.check_in && !log.check_out;
        })
        .sort((a, b) => parseApiDate(a) - parseApiDate(b))[0]
    : null;

        
        let show_start_button = false;
        let show_end_button = false;
        const hasTodayCheckIn = !!(todayLog && todayLog.check_in);
        const hasTodayCheckOut = !!(todayLog && todayLog.check_out);

        if (hasPendingCheckout && pendingCheckoutDate !== todayApiStr) {
            // end button should be shown to allow completing pending checkout (per spec)
            show_start_button = false;
            show_end_button = true;
        } else if (!hasTodayCheckIn && !hasPendingCheckout) {
            // no one checked in today and no pending elsewhere -> show start
            show_start_button = true;
            show_end_button = false;
        } else if (hasTodayCheckIn && !hasTodayCheckOut) {
            // checked in today but not out -> show end
            show_start_button = false;
            show_end_button = true;
        }else if (hasTodayCheckIn && hasTodayCheckOut) {
            show_start_button = false;
            show_end_button = false;
        }

        // id should be latest A.id or P.id
        const a_id = (A && A.id) ? A.id : null;
        const p_id = (P && P.id) ? P.id : null;

        // original_P: full original P object or null
        // original_A: full original A object (the highest id) or null
        const original_P = P || null;
        const original_A = A || null;

        return {
            p_id: p_id,
            a_id: a_id,
            title: project_name,
            customer_name,
            audit_type,
            project_name,
            activity_name,
            order_item_id,
            activity_id,
            project_code: order_item_key,

            planned_start_date: planned_start_date || null,
            planned_end_date: planned_end_date || null,
            planned_start_time: planned_start_time || null,
            planned_end_time: planned_end_time || null,

            actual_start_date: actual_start_date || null,
            actual_end_date: actual_end_date || null,

            complete: Boolean(complete),

            // todaysStatus must be one of "Active" | "Complete" | "Planned" | "Pending"
            // We already set "Complete", "Active", "Planned". Map "Pending" only if project_period_status === "Pending" AND no activity today
            todaysStatus: (todaysStatus === "Planned" && project_period_status === "Pending") ? "Planned" : todaysStatus,
            project_period_status,

            show_start_button,
            show_end_button,
            hasPendingCheckout,
            pendingCheckoutDate: pendingCheckoutDate || null,

            effort: totalEffort,
            effort_unit: effort_unit || null,

            total_no_of_items,

            day_logs: day_logs,

            original_P,
            original_A
        };
    });

    return final;
};

export const formatToDDMMYYYY = (dateValue) => {
    if (!dateValue) return ""

    if (dateValue instanceof Date) {
        const dd = String(dateValue.getDate()).padStart(2, "0")
        const mm = String(dateValue.getMonth() + 1).padStart(2, "0")
        const yyyy = dateValue.getFullYear()
        return `${dd}-${mm}-${yyyy}`
    }

    if (typeof dateValue === "string" && dateValue.includes("-")) {
        const [year, month, day] = dateValue.split("-")
        return `${day}-${month}-${year}`
    }

    return ""
}

export const getRandomColor = () => {
    const colors = ["#5B8DEF", "#F45B69", "#52B788", "#F59E0B", "#8B5CF6"];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const mapAllocationData = (apiData = []) => {

    if (!Array.isArray(apiData) || apiData.length === 0) {
        return {
            projectsData: [],
            employeeData: []
        };
    }

    const projectMap = {}
    const employeeMap = {}

    /*
      Step 1: Group by
      activity_id + order_item_key + emp_id
      Prefer A over P
    */
    const grouped = {}

    apiData.forEach(item => {
        const key = `${item.activity_id}_${item.order_item_key}_${item.emp_id}`

        if (!grouped[key]) {
            grouped[key] = { P: null, A: null }
        }

        if (item.activity_type === "P") {
            grouped[key].P = item
        }

        if (item.activity_type === "A") {
            if (!grouped[key].A) {
                grouped[key].A = item
            } else {
                grouped[key].A.ts_data_list = [
                    ...(grouped[key].A.ts_data_list || []),
                    ...(item.ts_data_list || [])
                ]
            }
        }
    })

    /*
      Step 2: Build projectMap + employeeMap
    */
    Object.values(grouped).forEach(group => {

        const data = group.A || group.P
        if (!data) return

        const activity_id = data.activity_id
        const order_item_key = data.order_item_key
        const project_name = data.project_name
        const customer_name = data.customer_name
        const audit_type = data.product_name

        const emp_id = data.emp_id
        const employee_name = data.employee_name

        const isWorking = !!group.A  // A = Working | P = Only Assigned

        const planned_start_date = group.P?.start_date || null
        const planned_end_date = group.P?.end_date || null

        const actual_start_date = group.A?.start_date || null
        const actual_end_date = group.A?.end_date || null

        const effort = group.A?.effort || 0
        const effort_unit = group.A?.effort_unit || null

        const complete = !!(group.A && group.A.status === "S");

        const day_logs = buildDayLogsFromAEntries(
            group.A ? [group.A] : [],
            //   group.A?.remarks || group.P?.remarks || ""
        )

        const projectKey = `${activity_id}_${order_item_key}`

        /* =================== EMPLOYEE MAP =================== */
        if (!employeeMap[emp_id]) {
            employeeMap[emp_id] = {
                emp_id,
                employee_name,
                color: getRandomColor(),   // ✅ Unique color per employee
                projects: []
            }
        }

        const employeeColor = employeeMap[emp_id].color


        /* =================== PROJECT DATA =================== */
        if (!projectMap[projectKey]) {
            projectMap[projectKey] = {
                activity_id,
                order_item_key,
                project_name,
                customer_name,
                audit_type,

                planned_start_date,
                planned_end_date,

                total_assigned_employees: 0,
                total_working_employees: 0,

                project_status: "planned",
                project_period_status: "Planned",

                teamMembers: [],
                totalHours: 0
            }
        }

        // ✅ Count assigned & working
        projectMap[projectKey].total_assigned_employees += 1
        if (isWorking) {
            projectMap[projectKey].total_working_employees += 1
        }

        // ✅ Update project status if ANY employee is working
        if (isWorking) {
            projectMap[projectKey].project_status = "active"
            projectMap[projectKey].project_period_status = "IN Progress"
        }

        projectMap[projectKey].teamMembers.push({
            emp_id,
            employee_name,
            color: employeeColor,      // ✅ same color everywhere

            type: isWorking ? "A" : "P",

            activity_status: complete,

            activity_id,
            order_item_key,
            project_name,

            planned_start_date,
            planned_end_date,

            actual_start_date,
            actual_end_date,

            effort,
            effort_unit,

            day_logs
        })

        projectMap[projectKey].totalHours =
            projectMap[projectKey].teamMembers.reduce(
                (sum, m) => sum + (Number(m.effort) || 0),
                0
            );



        /* =================== EMPLOYEE PROJECTS =================== */
        const alreadyAdded = employeeMap[emp_id].projects.some(
            p => p.activity_id === activity_id && p.order_item_key === order_item_key
        )

        if (!alreadyAdded) {
            employeeMap[emp_id].projects.push({
                activity_id,
                order_item_key,
                project_name,
                customer_name,
                audit_type,

                planned_start_date,
                planned_end_date,

                actual_start_date,
                actual_end_date,

                effort,
                effort_unit,

                project_status: isWorking ? "active" : "planned",
                project_period_status: isWorking ? "IN Progress" : "Planned",

                day_logs
            })
             employeeMap[emp_id].projects.totalHoursPerProject =
                 employeeMap[emp_id].projects.reduce(
                    (sum, m) => sum + (Number(m.effort) || 0),
                    0
            );
        }

    })


    return {
        projectsData: Object.values(projectMap),
        employeeData: Object.values(employeeMap)
    }
}

export const getStatusVariant = (status) => {
    if (!status) return "secondary";

    const key = status.toUpperCase().replace(/\s+/g, "_");
    const statusMap = {
        SUBMITTED: "info",
        APPROVED: "success",
        COMPLETE: "success",
        COMPLETED: "success",
        REJECTED: "error",
        CANCELLED: "error",
        PENDING: "warning",
        IN_PROGRESS: "warning",
        PLANNED: "notPlanned",
        NOT_PLANNED: "notPlanned"
    };

    return statusMap[key] || "secondary";
};

export const getMonthRange = ({ type = "current", mode = "month", offset = 0, weekStartsOn = 0 } = {}) => {
    const today = new Date()

    let finalOffset = offset

    if (type === "previous") finalOffset = -1
    if (type === "next") finalOffset = 1
    if (type === "current") finalOffset = 0

    let start, end

    // MONTH MODE
    if (mode === "month") {
        const year = today.getFullYear()
        const month = today.getMonth() + finalOffset

        start = new Date(year, month, 1)
        end = new Date(year, month + 1, 0)
    }

    // WEEK MODE (Sun–Sat)
    if (mode === "week") {
        const currentDay = today.getDay()
        const diffToStart =
            (currentDay - offset + 7) % 7

        start = new Date(today)
        start.setDate(
            today.getDate() - diffToStart + finalOffset * 7
        )

        end = new Date(start)
        end.setDate(start.getDate() + 6)
    }

    const formatLocal = (d) => {
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, "0")
        const dd = String(d.getDate()).padStart(2, "0")
        return `${yyyy}-${mm}-${dd}`
    }

    return {
        start: formatLocal(start),
        end: formatLocal(end)
    }
}

export const getCurrentDateTimeDefaults = () => {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, "0")
  const yyyy = now.getFullYear()
  const mm = pad(now.getMonth() + 1)
  const dd = pad(now.getDate())
  const todayISO = `${yyyy}-${mm}-${dd}`
  const currentTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  const dayLogKey = `${dd}-${MONTH_SHORT_NAMES[now.getMonth()]}-${yyyy}`
  const apiDate = formatToDDMMYYYY(todayISO)

  return { todayISO, dayLogKey, apiDate, currentTime }
}

export const getYesterday = () => {
  const date = new Date()
  date.setDate(date.getDate() - 1)

  const pad = (n) => String(n).padStart(2, "0")
  const yyyy = date.getFullYear()
  const mm = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())

  return {
    apiDate: `${dd}-${mm}-${yyyy}`,
    input: `${yyyy}-${mm}-${dd}`,
    dayLogKey: `${dd}-${MONTH_SHORT_NAMES[date.getMonth()]}-${yyyy}`
  }
}

// export const mapAllocationData = (apiData = []) => {

//     if (!Array.isArray(apiData) || apiData.length === 0) {
//         return {
//             projectsData: [],
//             employeeData: []
//         };
//     }

//     const projectMap = {}
//     const employeeMap = {}

//     /*
//       Step 1: Group by
//       activity_id + order_item_key + emp_id
//       Prefer A over P
//     */
//     const grouped = {}

//     apiData.forEach(item => {
//         const key = `${item.activity_id}_${item.order_item_key}_${item.emp_id}`

//         if (!grouped[key]) {
//             grouped[key] = { P: null, A: null }
//         }

//         if (item.activity_type === "P") {
//             grouped[key].P = item
//         }

//         if (item.activity_type === "A") {
//             if (!grouped[key].A) {
//                 grouped[key].A = item
//             } else {
//                 grouped[key].A.ts_data_list = [
//                     ...(grouped[key].A.ts_data_list || []),
//                     ...(item.ts_data_list || [])
//                 ]
//             }
//         }
//     })

//     /*
//       Step 2: Build projectMap + employeeMap
//     */
// normalized.forEach(project => {
//     const {
//         activity_id,
//         project_code,
//         project_name,
//         planned_start_date,
//         planned_end_date,
//         actual_start_date,
//         actual_end_date,
//         effort,
//         effort_unit,
//         day_logs,
//         original_A,
//         original_P,
//         complete,
//         project_period_status
//     } = project;

//     const order_item_key = project_code;

//     const emp_id = original_A?.emp_id || original_P?.emp_id;
//     const employee_name = original_A?.employee_name || original_P?.employee_name;

//     if (!emp_id) return;

//         /* =================== EMPLOYEE MAP =================== */
//         if (!employeeMap[emp_id]) {
//             employeeMap[emp_id] = {
//                 emp_id,
//                 employee_name,
//                 color: getRandomColor(),   // ✅ Unique color per employee
//                 projects: []
//             }
//         }

//         const employeeColor = employeeMap[emp_id].color

//         /* =================== PROJECT DATA =================== */
//         if (!projectMap[projectKey]) {
//             projectMap[projectKey] = {
//                 activity_id,
//                 order_item_key,
//                 project_name,

//                 planned_start_date,
//                 planned_end_date,

//                 total_assigned_employees: 0,
//                 total_working_employees: 0,

//                 project_status: "planned",
//                 project_period_status: "Planned",

//                 teamMembers: []
//             }
//         }

//         // ✅ Count assigned & working
//         projectMap[projectKey].total_assigned_employees += 1
//         if (isWorking) {
//             projectMap[projectKey].total_working_employees += 1
//         }

//         // ✅ Update project status if ANY employee is working
//         if (isWorking) {
//             projectMap[projectKey].project_status = "active"
//             projectMap[projectKey].project_period_status = "IN Progress"
//         }

//         projectMap[projectKey].teamMembers.push({
//             emp_id,
//             employee_name,
//             color: employeeColor,      // ✅ same color everywhere

//             type: isWorking ? "A" : "P",

//             activity_id,
//             order_item_key,
//             project_name,

//             planned_start_date,
//             planned_end_date,

//             actual_start_date,
//             actual_end_date,

//             effort,
//             effort_unit,

//             day_logs
//         })


//         /* =================== EMPLOYEE PROJECTS =================== */
//         const alreadyAdded = employeeMap[emp_id].projects.some(
//             p => p.activity_id === activity_id && p.order_item_key === order_item_key
//         )

//         if (!alreadyAdded) {
//             employeeMap[emp_id].projects.push({
//                 activity_id,
//                 order_item_key,
//                 project_name,

//                 planned_start_date,
//                 planned_end_date,

//                 actual_start_date,
//                 actual_end_date,

//                 effort,
//                 effort_unit,

//                 project_status: isWorking ? "active" : "planned",
//                 project_period_status: isWorking ? "IN Progress" : "Planned",

//                 day_logs
//             })
//         }

//     })


//     return {
//         projectsData: Object.values(projectMap),
//         employeeData: Object.values(employeeMap)
//     }
// }

const normalizeDate = (d) => {
  const date =
    d instanceof Date ? d : parseApiDate(d);

  if (!date) return null;

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`;
};


const getTodayActionFlags = ({ allAEntries }) => {
  const today = normalizeDate(new Date());
  
  // Find A started today
  const todayA = allAEntries.find(
    a => normalizeDate(a.start_date) === today
  );

  // 1️⃣ No A for today → Start
  if (!todayA) {
    return {
      showStartBtn: true,
      showCompleteBtn: false
    };
  }

  // 2️⃣ A exists & not completed → Complete
  if (todayA.status === "N") {
    return {
      showStartBtn: false,
      showCompleteBtn: true
    };
  }

  // 3️⃣ A exists & completed → Nothing
  return {
    showStartBtn: false,
    showCompleteBtn: false
  };
};

const toApiDateFromString = (dateStr) => {
  const d = new Date(dateStr);
  return isNaN(d) ? null : formatToApiDate(d);
};


const buildDayLogsFromAEntriesForRetainer = (allAEntries = []) => {
  return allAEntries.reduce((acc, entry) => {
    if (!entry.start_date) return acc;

    const dayKey = toApiDateFromString(entry.start_date);

    if (!acc[dayKey]) {
      acc[dayKey] = {
        date: dayKey,
        section: dayKey,
        remarks: entry.remarks || "",
        effort: 0,
        no_of_items: 0
      };
    }

    acc[dayKey].effort += Number(entry.effort || 0);
    acc[dayKey].no_of_items += Number(entry.no_of_items || 0);

    return acc;
  }, {});
};

export const formatRetainerActivities = (apiData = []) => {
  const grouped = buildActivityGroupMap(apiData);

  return grouped.map(group => {
    const { original_P, original_A, allAEntries, key } = group;

    const ui = getTodayActionFlags({ allAEntries });
    const day_logs = buildDayLogsFromAEntriesForRetainer(allAEntries);

    return {
      key,

      p_id: original_P?.id ?? null,
      a_id: original_A?.id ?? null,

      employee_name: original_P?.employee_name ?? "",
      emp_id: original_P?.emp_id ?? "",
      customer_name: original_P?.customer_name ?? "",
      product_name: original_P?.product_name ?? "",
      project_name: original_P?.project_name ?? "",
      activity_name: original_P?.activity_name ?? "",
      order_item_id: original_P?.order_item_id ?? "",
      order_item_key: original_P?.order_item_key ?? "",

      is_file_applicable: original_P?.is_file_applicable ?? false,
      audit_type: original_P?.audit_type ?? "",
      store_name: original_P?.store_name ?? "",
      store_remarks: original_P?.store_remarks ?? "",

      complete: original_A?.status && original_A.status !== "N",

      original_P,
      original_A,
      allAEntries,

      day_logs,

      ui
    };
  });
};

const isPastDate = (dateStr) => {
  if (!dateStr) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const date = new Date(dateStr);
  date.setHours(0, 0, 0, 0);

  return date < today;
};

export const mapEmployeeCustomerOrderItemData = (apiData = []) => {
  if (!Array.isArray(apiData) || apiData.length === 0) return [];

  const employeeMap = {};

  /* ---------------------------------------------------
     STEP 1: Separate P and A entries
  --------------------------------------------------- */
  const plannedMap = {};
  const actualMap = {};

  apiData.forEach(item => {
    if (item.activity_type === "P") {
      plannedMap[item.id] = item;
    }

    if (item.activity_type === "A") {
      const pId = String(item.free_code || "");
      if (!actualMap[pId]) actualMap[pId] = [];
      actualMap[pId].push(item);
    }
  });

  /* ---------------------------------------------------
     STEP 2: Process Planned (P) and attach Actual (A)
  --------------------------------------------------- */
  Object.values(plannedMap).forEach(P => {
    const emp_id = P.emp_id;
    const employee_name = P.employee_name;
    const customer_name = P.customer_name;
    const order_item_id = P.order_item_id;

    const A = (actualMap[String(P.id)] || []).find(
      a => a.order_item_id === P.order_item_id
    ) || null;

    /* ---------- Employee ---------- */
    if (!employeeMap[emp_id]) {
      employeeMap[emp_id] = {
        emp_id,
        employee_name,
        customers: {}
      };
    }

    /* ---------- Customer ---------- */
    if (!employeeMap[emp_id].customers[customer_name]) {
      employeeMap[emp_id].customers[customer_name] = {
        customer_name,
        order_items: {}
      };
    }

    const customerNode = employeeMap[emp_id].customers[customer_name];

    /* ---------- Order Item ---------- */
    if (!customerNode.order_items[order_item_id]) {
      customerNode.order_items[order_item_id] = {
        order_item_id,
        order_item_key: P.order_item_key,

        /* common / lifted fields */
        p_id: P.id || null,
        a_id: A?.id || null,
        activity_id: P.activity_id,

        project_name: P.project_name,
        customer_name: P.customer_name,
        audit_type: P.product_name || A?.product_name || "",
        audit_item_no_planned: P.no_of_items || 0,
        audit_item_no_actual: A?.no_of_items || 0,
        location: P.store_name || A?.store_name || "",
        remarks: P.store_remarks || "",

        planned_start_date: P.start_date || null,
        planned_end_date: P.end_date || null,
        planned_start_time: P.start_time || null,
        planned_end_time: P.end_time || null,
        actual_start_date: A?.start_date || null,
        actual_end_date: A?.end_date || null,

        order_item_complete_status: A
        ? A.status === "S"
            ? "completed"
            : "in progress"
        : isPastDate(P.start_date)
            ? "pending"
            : "planned",


        /* PLANNED */
        planned: {
          exists: true,
          effort: P.effort || 0,
          effort_unit: P.effort_unit || null,
          remarks: P.remarks || "",
          original_P: P
        },

        /* ACTUAL */
        actual: A
          ? {
              exists: true,
              effort: A.effort || 0,
              effort_unit: A.effort_unit || null,
              status: A.status || "",
              start_date: A.start_date || null,
              end_date: A.end_date || null,
              day_logs: buildDayLogsFromAEntries([A]),
              submitted_file: A.submitted_file || null,
              original_A: A
            }
          : {
              exists: false,
              original_A: null
            }
      };
    }
  });

  /* ---------------------------------------------------
     STEP 3: Convert maps → arrays
  --------------------------------------------------- */
  return Object.values(employeeMap).map(emp => ({
    ...emp,
    customers: Object.values(emp.customers).map(cust => ({
      ...cust,
      order_items: Object.values(cust.order_items)
    }))
  }));
};

export const getStatusLabelVariant = (status) => {
  if (!status) {
    return { variant: "secondary", status_label: "Unknown" };
  }

  const key = status.toUpperCase().replace(/\s+/g, "_");

  const statusMap = {
    SUBMITTED:   { variant: "info",       status_label: "Submitted" },
    APPROVED:    { variant: "success",    status_label: "Approved" },
    COMPLETE:    { variant: "success",    status_label: "Completed" },
    COMPLETED:   { variant: "success",    status_label: "Completed" },
    REJECTED:    { variant: "error",      status_label: "Rejected" },
    CANCELLED:   { variant: "error",      status_label: "Cancelled" },

    PENDING:     { variant: "forward",    status_label: "Pending" },
    IN_PROGRESS: { variant: "info",    status_label: "In Progress" },

    PLANNED:     { variant: "notPlanned", status_label: "Planned" },
    NOT_PLANNED: { variant: "notPlanned", status_label: "Not Planned" }
  };

  return (
    statusMap[key] || {
      variant: "secondary",
      status_label: status
    }
  );
};
const MONTH_SHORT_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//formatDate("2026-02-25")  ->  "Feb 25, 2026"
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

export const normalizeToDDMMYYYY = (dateStr) => {
  if (!dateStr) return "";

  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [y, m, d] = dateStr.split("-");
    return `${d}-${m}-${y}`;
  }

  const parsed = new Date(dateStr);
  if (!isNaN(parsed)) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const year = parsed.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return dateStr;
};

//parseApiDate("25-Feb-2026")      -> Date object: 2026-02-25 00:00:00 local
  export const parseApiDate = (apiDateStr) => {
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

// const date1 = new Date(2026, 1, 25)  // Feb 25, 2026
// formatToApiDate(date1)               // "25-Feb-2026"
export const formatToApiDate = (d) => {
    if (!(d instanceof Date)) return null;
    const dd = String(d.getDate()).padStart(2, "0");
    const mon = MONTH_SHORT_NAMES[d.getMonth()];
    const yyyy = d.getFullYear();
    return `${dd}-${mon}-${yyyy}`;
};

//24hr → 12hr {formatAPITime("18:30") ->"06:30 PM"}
export const formatAPITime = (time24) => {
  if (!time24) return ""
  const [h, m] = time24.split(":")
  let hours = parseInt(h, 10)
  const ampm = hours >= 12 ? "PM" : "AM"
  hours = hours % 12 || 12
  return `${hours.toString().padStart(2, "0")}:${m} ${ampm}`
}

// 12hr → 24hr {convert12To24Hour("06:10 PM") -> "18:10"}
export const convert12To24Hour = (time12h) => {
  if (!time12h) return '';

  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  hours = parseInt(hours, 10);

  if (modifier.toUpperCase() === 'AM') {
    if (hours === 12) hours = 0;
  } else if (modifier.toUpperCase() === 'PM') {
    if (hours !== 12) hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${minutes}`;
};


export const getTodayApiDateStr = () => {
    const d = new Date();
    return formatToApiDate(d);
};

// parseISO("2026-02-25") -> Date object: 2026-02-25 00:00:00 local
export const parseISO = (iso) => {
  if (!iso) return null
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

//this below function formate date in this way 👉 "18 Jan – 24 Jan, 2026"
// export const formatWeekLabel = (startISO, endISO) => {
//   const start = parseISO(startISO)
//   const end = parseISO(endISO)
//   if (!start || !end) return ""

//   const startDay = start.getDate()
//   const endDay = end.getDate()
//   const month = MONTH_SHORT_NAMES[start.getMonth()]
//   const year = start.getFullYear()

//   return `${startDay} ${month} – ${endDay} ${month}, ${year}`
// }

export const formatWeekLabel = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return `${s.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} – ${e.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`;
  // → "26 Jan – 1 Feb"
};

//this below function formate date in this way 👉 "January 2026"
export const formatMonthLabel = (start) => {
  const d = new Date(start);
  return d.toLocaleString('default', { month: 'long', year: 'numeric' });
  // → "January 2026"
};

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
    const parts = geoString.split("^O|");
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

    // const aEffort = typeof aEntry.effort === "number" ? aEntry.effort : 0;

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
      const tsEffort = ts.effort

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
        effort: tsEffort || 0,
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
      const freeCodeId = Number(item.ref_p_id); // string → number
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
        const is_ope_actual = (P?.is_ope_actual) || (A?.is_ope_actual) ;
        const order_item_status = (P?.order_item_status) || (A?.order_item_status) ;
        const ope_amt = (A?.ope_amt) ;

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

        const complete = A?.status && A.status !== "N";

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

        const todayLog = day_logs[todayApiStr] || null;
        let todaysStatus = "Planned";
        if (todayLog && todayLog.check_in && todayLog.check_out) {
            todaysStatus = "Complete";
        } else if (todayLog && todayLog.check_in && !todayLog.check_out) {
            todaysStatus = "Active";
        } else {
            todaysStatus = "Planned";
        }

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
        
        const a_id = (A && A.id) ? A.id : null;
        const p_id = (P && P.id) ? P.id : null;

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
            is_ope_actual: is_ope_actual || false,
            order_item_status: order_item_status,
            ope_amt: ope_amt,

            complete: Boolean(complete),

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

export const getMonthRange = ({ type = "current", mode = "month", offset = 0, weekStartsOn = 0,} = {}) => {
  const today = new Date();

  let direction = 0;
  if (type === "previous") direction = -1;
  if (type === "next") direction = 1;
  if (type === "current") direction = 0;

  const finalOffset = direction + offset;

  let start = new Date(today);
  let end = new Date(today);

  if (mode === "month") {
    // Move to target month
    start.setMonth(today.getMonth() + finalOffset, 1);
    end.setMonth(today.getMonth() + finalOffset + 1, 0); // last day of that month
  } else if (mode === "week") {
    const currentDay = today.getDay();
    // How many days to subtract to reach the start of the week
    const diffToWeekStart = (currentDay - weekStartsOn + 7) % 7;

    // Go to start of current week, then apply offset
    start.setDate(today.getDate() - diffToWeekStart + finalOffset * 7);
    
    end = new Date(start);
    end.setDate(start.getDate() + 6);
  }  else if (mode === "today") {
    start.setDate(today.getDate() + finalOffset);
    end = new Date(start);
  } 
  else {
    throw new Error(`Unsupported mode: "${mode}". Use "month" or "week".`);
  }

  const format = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return {
    start: format(start),
    end: format(end),
  };
};

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

export const normalizeDate = (d) => {
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
      showCompleteBtn: false,
      showUpdateBtn: false,
      isCompleted: false

    };
  }

  // 2️⃣ A exists & not completed → Complete
  if (todayA.status === "N") {
    return {
      showStartBtn: false,
      showCompleteBtn: true,
      showUpdateBtn: false,
      isCompleted: false
    };
  }

  // 3️⃣ A exists & completed → Nothing
  return {
    showStartBtn: false,
    showCompleteBtn: false,
    showUpdateBtn: true,
    isCompleted: true
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
        no_of_items: 0,
        resourceList: entry.resource_list,
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
    const completed = original_A?.status && original_A.status !== "N" ? "In Progress" : "Completed"

    const ui = getTodayActionFlags({ allAEntries});
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

      planned_start_date: original_P?.start_date || null,
      planned_end_date: original_P?.end_date || null,
      planned_start_time: original_P?.start_time || null,
      planned_end_time: original_P?.end_time || null,

      actual_start_date: original_A?.start_date || null,
      actual_end_date: original_A?.end_date || null,

      is_file_applicable: original_P?.is_file_applicable ?? false,
      audit_type: original_P?.audit_type ?? "",
      store_name: original_P?.store_name ?? "",
      store_remarks: original_P?.store_remarks ?? "",

      complete: completed,
      is_complete: completed === "Completed" ? true : false,

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
      const pId = String(item.ref_p_id || "");
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
        employee_name: P.employee_name,
        emp_id: P.emp_id,
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

const getDayActualTimes = (dayLogs, selectedDate) => {
  const log = dayLogs[selectedDate];
  if (!log) return {};

  return {
    firstCheckIn: log.check_in || "",
    lastCheckOut: log.check_out || "",
  };
};

const getTimeStatus = ({ plannedStart, actualStart, actualDate, bufferMinutes = 0, isDateOnly }) => {

  if (!actualStart) return null;

  // Date-only scenario
  if (isDateOnly) {
    return actualStart.date === plannedStart.date ? "ON_TIME" : "DELAYED";
  }

  const bufferMs = bufferMinutes * 60 * 1000;

  const plannedWithBuffer =
    new Date(plannedStart.getTime() + bufferMs);

  return actualStart <= plannedWithBuffer ? "ON_TIME" : "DELAYED";
};

const getCheckoutStatus = ({ plannedEnd, actualCheckout, bufferMinutes = 0, isDateOnly }) => {

  if (!plannedEnd || !actualCheckout) return null;
  
  if (isDateOnly) {
    return actualCheckout.toDateString() <= plannedEnd.toDateString() ? "ON_BEFORE_TIME" : "DELAYED";
  }

  const bufferMs = bufferMinutes * 60 * 1000;
  const plannedTime = new Date(0);
  plannedTime.setHours( plannedEnd.getHours(),plannedEnd.getMinutes(),0,0);

  const actualTime = new Date(0);
  actualTime.setHours(actualCheckout.getHours(),actualCheckout.getMinutes(),0,0);

  const plannedWithBuffer = new Date(plannedTime.getTime() + bufferMs);

  return actualTime <= plannedWithBuffer ? "ON_BEFORE_TIME" : "DELAYED";
};

export const buildActualDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) return null;

  const date = new Date(dateStr);

  // "09:07 AM"
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");

  hours = Number(hours);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  date.setHours(hours);
  date.setMinutes(Number(minutes));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};


export const buildDateTime = (dateStr, timeStr) => {
  if (!dateStr) return null;

  // Convert "10-Feb-2026" → Date
  const date = new Date(dateStr);

  // If time not available → date only
  if (!timeStr) {
    return {
      dateObj: date,
      isDateOnly: true
    };
  }

  // time format "09:00"
  const [hours, minutes] = timeStr.split(":");

  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(0);
  date.setMilliseconds(0);

  return {
    dateObj: date,
    isDateOnly: false
  };
};

const buildAggregatedActualForDate = (dayLogs, selectedDate) => {
  const logs = Object.values(dayLogs).filter(l => l?.date === selectedDate);

    if (!logs || logs.length === 0) {
    return {
      CheckInDate: selectedDate,
      firstCheckIn: "",
      lastCheckOut: "",
      totalItems: 0,
      totalEffort: 0,
      status: "",
      sessions: []
    };
  }

  const firstCheckIn = logs?.filter(l => l.check_in).map(l => l.check_in).sort()[0] || "";
  const lastCheckOut = logs?.filter(l => l.check_out).map(l => l.check_out).sort().reverse()[0] || "";

  const totalItems = logs?.reduce((sum, l) => sum + (Number(l.no_of_items) || 0),0);

  const totalEffort = logs?.reduce((sum, l) => sum + (Number(l.effort) || 0),0);
  const status = logs[0]?.timeSheetStatus;

  return {
    CheckInDate: selectedDate,
    firstCheckIn,
    lastCheckOut,
    totalItems,
    totalEffort,
    status,
    sessions: logs
  };
};


export const deriveActivityStatusForDate = ( groupedActivities, selectedDate, currentDateTime) => {
  
  return groupedActivities
  .filter(group => {
    
    const dayLogs = buildDayLogsFromAEntries(group.allAEntries);
    if (dayLogs[selectedDate]) return true;
    
    const P = group.original_P || {};

    if (!P.start_date || !P.end_date) return false;

    const plannedStart = parseApiDate(P.start_date);
    const plannedEnd = parseApiDate(P.end_date);
    const selected = parseApiDate(selectedDate);

    if (!plannedStart || !plannedEnd || !selected) return false;

    return (
      selected.getTime() >= plannedStart.getTime() &&
      selected.getTime() <= plannedEnd.getTime()
    );
  })
  .map(group => {

    const P = group.original_P || {};
    const A = group?.original_A || {};
    const planned = {
      startDate: P.start_date || "",
      endDate: P.end_date || "",
      startTime: P.start_time || "",
      endTime: P.end_time || ""
    };

  const dayLogs = buildDayLogsFromAEntries(group.allAEntries);
  const actual = buildAggregatedActualForDate(dayLogs, selectedDate);

  const plannedStartData = buildDateTime(P.start_date, P.start_time);
  const plannedStart = plannedStartData?.dateObj;
  const isDateOnly = plannedStartData?.isDateOnly;

  const plannedEndData = buildDateTime(P.end_date, P.end_time);
  const plannedEnd = plannedEndData?.dateObj;
  // const isEndDateOnly = plannedEndData?.isDateOnly;

  const ActualStartData = buildDateTime(actual.CheckInDate, convert12To24Hour(actual.firstCheckIn.time));
  const actualStart = ActualStartData?.dateObj;
  // const isDateOnlyA = ActualStartData?.isDateOnly;

  const ActualEndData = buildDateTime(actual.CheckInDate, convert12To24Hour(actual.lastCheckOut.time));
  // const actualEnd = ActualEndData?.dateObj;
  const isEndDateOnlyA = ActualEndData?.isDateOnly;


    const actualTimes = getDayActualTimes(dayLogs, selectedDate);

    const complete = A?.status && A.status !== "N";

        let project_period_status = "Planned";
        const anyAHasCompleted = group?.allAEntries.some(x => x && (x.status === "S" || (x.status_display && x.status_display.toUpperCase() === "SUBMITTED")));
        if (complete || anyAHasCompleted) {
            project_period_status = "Completed";
        } else if (group?.allAEntries && group?.allAEntries.length > 0) {
            project_period_status = "In Progress";
        } else if (P) {
            if (planned.endDate) {
                const end = parseApiDate(planned.endDate);
                const today = parseApiDate(selectedDate);
                if (end && today && end.getTime() < today.getTime()) {
                    project_period_status = "Pending";
                } else {
                    project_period_status = "Planned";
                }
            } else {
                project_period_status = "Planned";
            }
        } else {
            project_period_status = "Pending";
        }

    const baseActivity = {
    key: group.key,

    customer_name: P.customer_name || "",
    employee_name: P.employee_name || "",
    emp_id: P.emp_id || "",
    store_name: P.store_name || "",
    order_item_key: P.order_item_key || "",
    audit_type: P.audit_type || "",
    emp_grade: P.grade_level || 0,

    original_P: P,
    original_A: group.original_A,
    allAEntries: group.allAEntries,
    project_period_status,

    planned,
    actual,
    dayLogs,
    // todayLog
  };

  const actualCheckoutDateTime = buildActualDateTime(actual.CheckInDate,actual.lastCheckOut.time);
// ---- CHECK OUT ----
  if (actual.firstCheckIn && actual.lastCheckOut) {
    return {
      ...baseActivity,
      status: {
        main: "CHECK_OUT",
        sub: getCheckoutStatus({
          plannedEnd,
          actualCheckout: actualCheckoutDateTime,
          // bufferMinutes,
          isDateOnly: isEndDateOnlyA
        })
      },
      // todayLog
    };
  }

    // ---- STARTED ----
    if (actualTimes.firstCheckIn) {
      return {
        ...baseActivity,
        status: {
          main: "STARTED",
          sub: getTimeStatus({
            plannedStart,
            actualStart: actualStart,
            // actualDate: actual.CheckInDate,
            // bufferMinutes,
            isDateOnly
          })
        },
        // todayLog
      };
    }

    // ---- NOT STARTED ----
    const now = currentDateTime;

    const selected = parseApiDate(selectedDate);
    const today = new Date( now.getFullYear(), now.getMonth(), now.getDate());
    let sub = "PLANNED";

    if (selected) {

      const selectedMidnight = new Date( selected.getFullYear(), selected.getMonth(), selected.getDate());

      if (selectedMidnight > today) {
        sub = "PLANNED";

      } else if (selectedMidnight < today) {
        sub = "OVERDUE";

      } else {
        if (plannedStart && plannedStart < now) {
          sub = "OVERDUE";
        } else {
          sub = "PLANNED";
        }
      }
    }

    return {
      ...baseActivity,
      status: {
        main: "NOT_STARTED",
        sub
      },
      // todayLog
    };
  });
};

export const buildStatsSummary = (activities) => {
  const stats = {
    STARTED: { ON_TIME: 0, DELAYED: 0, total: 0 },
    NOT_STARTED: { PLANNED: 0, OVERDUE: 0, total: 0 },
    CHECK_OUT: { ON_BEFORE_TIME: 0, DELAYED: 0, total: 0 }
  };

  activities.forEach(a => {
    stats[a.status.main][a.status.sub]++;
    stats[a.status.main].total++;
  });

  return stats;
};

export const filterActivities = ( activities, statusFilter, customer, employee, searchText) => {

  return activities.filter(a => {

    if (statusFilter) {
      if (a.status.main !== statusFilter.main) return false;
      if (statusFilter.sub && a.status.sub !== statusFilter.sub) return false;
    }

    if (customer && a.customer_name !== customer)
      return false;

    if (employee && a.emp_id !== employee)
      return false;

    if (searchText) {
      const text = searchText.toLowerCase();

      return (
        a.customer_name?.toLowerCase().includes(text) ||
        a.employee_name?.toLowerCase().includes(text) ||
        a.emp_id?.toLowerCase().includes(text) ||
        a.store_name?.toLowerCase().includes(text) ||
        a.order_item_key?.toLowerCase().includes(text)
      );
    }

    return true;
  });
};


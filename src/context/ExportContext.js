import { createContext, useContext } from "react"
import * as XLSX from "xlsx"

const ExportContext = createContext()

export const useExport = () => {
  const context = useContext(ExportContext)
  if (!context) {
    throw new Error("useExport must be used within an ExportProvider")
  }
  return context
}

export const ExportProvider = ({ children }) => {
  // Generic function to export any data to Excel
  const exportToExcel = (data, filename = "export", sheetName = "Sheet1", customHeaders = null) => {
    try {
      if (!data || data.length === 0) {
        throw new Error("No data to export")
      }

      // Create a new workbook
      const workbook = XLSX.utils.book_new()

      // Prepare data for export
      let exportData = [...data]

      // If custom headers are provided, use them to filter and rename columns
      if (customHeaders) {
        exportData = data.map((row) => {
          const newRow = {}
          customHeaders.forEach((header) => {
            if (typeof header === "string") {
              newRow[header] = row[header] || ""
            } else if (typeof header === "object") {
              // Handle custom header mapping: { key: 'original_key', label: 'Display Name' }
              newRow[header.label] = row[header.key] || ""
            }
          })
          return newRow
        })
      }

      // Create worksheet from data
      const worksheet = XLSX.utils.json_to_sheet(exportData)

      // Auto-size columns
      const colWidths = []
      const headers = Object.keys(exportData[0] || {})

      headers.forEach((header, index) => {
        const maxLength = Math.max(header.length, ...exportData.map((row) => String(row[header] || "").length))
        colWidths[index] = { width: Math.min(maxLength + 2, 50) }
      })

      worksheet["!cols"] = colWidths

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      const finalFilename = `${filename}_${timestamp}.xlsx`

      // Write and download file
      XLSX.writeFile(workbook, finalFilename)

      return {
        success: true,
        message: `Data exported successfully as ${finalFilename}`,
        filename: finalFilename,
      }
    } catch (error) {
      console.error("Export error:", error)
      return {
        success: false,
        message: `Export failed: ${error.message}`,
        error,
      }
    }
  }

  // Specialized function for employee data export
  const exportEmployeeData = (employees, filename = "employee_data") => {
    const customHeaders = [
      { key: "emp_id", label: "Employee ID" },
      { key: "name", label: "Full Name" },
      { key: "email_id", label: "Email Address" },
      { key: "department_name", label: "Department" },
      { key: "grade_name", label: "Position/Grade" },
      { key: "date_of_join", label: "Join Date" },
      { key: "is_manager", label: "Manager Status" },
    ]

    // Transform manager status to readable format
    const transformedData = employees.map((emp) => ({
      ...emp,
      is_manager: emp.is_manager ? "Manager" : "Employee",
    }))

    return exportToExcel(transformedData, filename, "Employees", customHeaders)
  }

  // Specialized function for claims data export
  const exportClaimsData = (claims, filename = "claims_data") => {
    const customHeaders = [
      { key: "claim_id", label: "Claim ID" },
      { key: "employee_name", label: "Employee Name" },
      { key: "item_name", label: "Claim Type" },
      { key: "expense_amt", label: "Amount" },
      { key: "expense_status", label: "Status" },
      { key: "submitted_date", label: "Submission Date" },
      { key: "expense_date", label: "Expense Date" },
    ]

    return exportToExcel(claims, filename, "Claims", customHeaders)
  }

  // Specialized function for timesheet data export
  const exportTimesheetData = (timesheets, filename = "timesheet_data") => {
    const customHeaders = [
      { key: "employee_name", label: "Employee Name" },
      { key: "project_code", label: "Project" },
      { key: "activity_name", label: "Activity" },
      { key: "a_date", label: "Date" },
      { key: "effort", label: "Working Hours" },
      { key: "remarks", label: "Remarks" },
    ]

    return exportToExcel(timesheets, filename, "Timesheets", customHeaders)
  }

  // Specialized function for appointment data export
  const exportAppointmentData = (appointments, filename = "appointment_data") => {
    const customHeaders = [
      { key: "a_date", label: "Date" },
      { key: "start_time", label: "Start Time" },
      { key: "end_time", label: "End Time" },
      { key: "attendance_type_display", label: "Status" },
    ]

    return exportToExcel(appointments, filename, "Appointments", customHeaders)
  }
  //help desk data export
    const exportHelpdeskdat = (appointments, filename = "appointment_data") => {
    const customHeaders = [
      { key: "request_id", label: "Request ID" },
      { key: "request_sub_type", label: "Type" },
      { key: "request_text", label: "Description" },
      { key: "request_status", label: "Status" },
      { key: "created_date", label: "Created Date" },
      { key: "remarks", label: "Remarks" },
    ]

    return exportToExcel(appointments, filename, "Appointments", customHeaders)
  }

  // Function to export multiple sheets in one workbook
  const exportMultipleSheets = (sheetsData, filename = "multi_sheet_export") => {
    try {
      const workbook = XLSX.utils.book_new()

      sheetsData.forEach(({ data, sheetName, headers }) => {
        if (data && data.length > 0) {
          let exportData = [...data]

          if (headers) {
            exportData = data.map((row) => {
              const newRow = {}
              headers.forEach((header) => {
                if (typeof header === "string") {
                  newRow[header] = row[header] || ""
                } else if (typeof header === "object") {
                  newRow[header.label] = row[header.key] || ""
                }
              })
              return newRow
            })
          }

          const worksheet = XLSX.utils.json_to_sheet(exportData)

          // Auto-size columns
          const colWidths = []
          const sheetHeaders = Object.keys(exportData[0] || {})

          sheetHeaders.forEach((header, index) => {
            const maxLength = Math.max(header.length, ...exportData.map((row) => String(row[header] || "").length))
            colWidths[index] = { width: Math.min(maxLength + 2, 50) }
          })

          worksheet["!cols"] = colWidths
          XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)
        }
      })

      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, "-")
      const finalFilename = `${filename}_${timestamp}.xlsx`

      XLSX.writeFile(workbook, finalFilename)

      return {
        success: true,
        message: `Multi-sheet data exported successfully as ${finalFilename}`,
        filename: finalFilename,
      }
    } catch (error) {
      console.error("Multi-sheet export error:", error)
      return {
        success: false,
        message: `Export failed: ${error.message}`,
        error,
      }
    }
  }

  const value = {
    exportToExcel,
    exportEmployeeData,
    exportClaimsData,
    exportTimesheetData,
    exportAppointmentData,
    exportMultipleSheets,
    exportHelpdeskdat,
  }

  return <ExportContext.Provider value={value}>{children}</ExportContext.Provider>
}

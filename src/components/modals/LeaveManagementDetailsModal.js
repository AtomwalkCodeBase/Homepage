import React from 'react'
import Badge from '../Badge'
import Modal from './Modal'
import Button from '../Button'

const LeaveManagementDetailsModal = ({leaveData, setShowModal }) => {
  return (
	 <Modal onClose={() => setShowModal(false)}>
          <div style={{ padding: "0.8rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Leave Details</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                <tr><td><strong>Employee Name:</strong></td><td>{leaveData.emp_data?.name || "—"}</td></tr>
                <tr><td><strong>Employee ID:</strong></td><td>{leaveData.emp_data?.emp_id || "—"}</td></tr>
                <tr><td><strong>Leave Request Type:</strong></td><td>{leaveData.leave_type_display}</td></tr>
                <tr><td><strong>From:</strong></td><td>{leaveData.from_date}</td></tr>
                <tr><td><strong>to:</strong></td><td>{leaveData.to_date}</td></tr>
                <tr><td><strong>Applied on:</strong></td><td>{leaveData.submit_date}</td></tr>
                <tr><td><strong>Status:</strong></td><td>
					<Badge
                  variant={
                    leaveData.status_display === "Approved" ? "success" : leaveData.status_display === "Submitted" ? "warning" : "error"
                  }
                >
                  {leaveData.status_display}
                </Badge></td></tr>
                <tr><td><strong>Remarks:</strong></td><td>{leaveData.remarks || "—"}</td></tr>
                {leaveData.approve_by && (
                  <tr><td><strong>Approval by:</strong></td><td>{leaveData.approve_by?.name || "—"}</td></tr>
                )}
                {leaveData.approve_date && (
                  <tr><td><strong>Approval Date:</strong></td><td>{leaveData.approve_date}</td></tr>
                )}
                {leaveData.approve_remarks && (
                  <tr><td><strong>Approval Remarks:</strong></td><td>{leaveData.approve_remarks}</td></tr>
                )}
              </tbody>
            </table>

            <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>

  )
}

export default LeaveManagementDetailsModal
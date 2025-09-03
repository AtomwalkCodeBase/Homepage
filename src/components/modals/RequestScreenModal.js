import React from 'react'
import Modal from './Modal'
import Button from '../Button'
import Badge from '../Badge'

const RequestScreenModal = ({ modalType, selectedTicket, closeModal }) => {
	const getStatusTravelInfo = (request) => {
		switch (request.status) {
			case "S":
				return { text: "Submitted", variant: "warning" }
			case "D":
				return { text: "Draft", variant: "info" }
			case "X":
				return { text: "Cancelled", variant: "error" }
			case "B":
				return { text: "Booked", variant: "success" }
			default:
				return { text: request.status, variant: "warning" }
		}
	}

	const getStatusInfo = (request) => {
		switch (request.request_status) {
			case "S":
				return { text: "Submitted", variant: "warning" }
			case "A":
				return { text: "Assigned", variant: "info" }
			case "X":
				return { text: "Cancelled", variant: "error" }
			case "C":
				return { text: "Completed", variant: "success" }
			default:
				return { text: request.status_display, variant: "warning" }
		}
	}

	const getStatusTravelBadgeInfo = (request) => {
		switch (request.status) {
			case "S":
				return { text: "Submitted", variant: "warning" }
			case "D":
				return { text: "Draft", variant: "info" }
			case "X":
				return { text: "Cancelled", variant: "error" }
			case "B":
				return { text: "Booked", variant: "success" }
			default:
				return { text: request.status, variant: "warning" }
		}
	}

	return (
		<>
			<Modal onClose={closeModal}>
				<h2>{modalType === "travel" ? "Travel" : "Ticket"} Details</h2>
				<p style={{ margin: 20 }}>
					<strong>{modalType === "travel" ? "Travel" : "Request"} ID:</strong>{modalType === "travel" ? selectedTicket.travel_id : selectedTicket.request_id}
				</p>
				{modalType === "travel" && <p style={{ margin: 20 }}>
					<strong>Project Name:</strong> {selectedTicket.project_name || "--"}
				</p>}
				{modalType === "travel" && <p style={{ margin: 20 }}>
					<strong>Project code:</strong> {selectedTicket.project_code}
				</p>}
				{modalType === "travel" && <p style={{ margin: 20 }}>
					<strong>City:</strong> {selectedTicket.to_city}
				</p>}
				{(modalType === "travel" && selectedTicket.advance_amt > 0) && <p style={{ margin: 20 }}>
					<strong>Advance Amount:</strong> {selectedTicket.advance_amt}
				</p>}
				{(modalType === "travel" && selectedTicket.advance_required) && <p style={{ margin: 20 }}>
					<strong>Advance Required:</strong> {selectedTicket.advance_required === "false" ? "NO" : "YES"}
				</p>}
				{(modalType === "travel" && selectedTicket.is_accommodation) && <p style={{ margin: 20 }}>
					<strong>Accommodation Required:</strong> {selectedTicket.is_accommodation === "false" ? "NO" : "YES"}
				</p>}
				<p style={{ margin: 20 }}>
					<strong>{modalType === "travel" ? "Travel mode" : "Type"}:</strong> {modalType === "travel" ? selectedTicket.travel_mode : selectedTicket.request_sub_type}
				</p>
				<p style={{ margin: 20 }}>
					<strong>{modalType === "travel" ? "Travel Purpose" : "Description"}:</strong> {modalType === "travel" ? selectedTicket.travel_purpose : selectedTicket.request_text}
				</p>
				<p style={{ margin: 20 }}>
					<strong>Remarks:</strong> {selectedTicket.remarks || "--"}
				</p>
				{modalType === "request" && <p style={{ margin: 20 }}>
					<strong>Created Date:</strong> {selectedTicket.created_date}
				</p>}
				{modalType === "travel" && <p style={{ margin: 20 }}>
					<strong>Start Date:</strong> {selectedTicket.start_date}
				</p>}
				{modalType === "travel" && <p style={{ margin: 20 }}>
					<strong>End Date:</strong> {selectedTicket.end_date}
				</p>}
				<p style={{ margin: 20 }}>
					<strong>Status:</strong>
					<Badge variant={modalType === "travel" ? getStatusTravelInfo(selectedTicket).variant : getStatusInfo(selectedTicket).variant}> 
						{modalType === "travel" ? getStatusTravelInfo(selectedTicket).text : getStatusInfo(selectedTicket).text}
					</Badge>
				</p>
				{modalType === "request" && selectedTicket.submitted_file_1 &&
					<img
						src={selectedTicket.submitted_file_1 || "/placeholder.svg"}
						// alt="Request Image"
						style={{ width: "100%", height: "auto", borderRadius: "8px", marginTop: "1rem" }}
					/>
				}
				<div style={{ marginTop: "1rem" }}>
					<Button variant="primary" onClick={closeModal}>
						Close
					</Button>
				</div>
			</Modal>
		</>
	)
}

export default RequestScreenModal
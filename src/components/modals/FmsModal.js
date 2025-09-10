import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Button from "../Button";
import { getemployeeList } from "../../services/productServices";
import Badge from "../Badge";
import moment from "moment/moment";

const FmsModal = ({ onClose, ticket, isTicket }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [employees, setEmployees] = useState([]);
	const [assignedEmployee, setAssignedEmployee] = useState(null);

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await getemployeeList();
				setEmployees(response.data || []);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchEmployees();
	}, []);

	useEffect(() => {
		if (employees.length > 0 && ticket?.emp_assigned) {
			const emp = employees.find((e) => e.emp_id === ticket.emp_assigned);
			setAssignedEmployee(emp || null);
		}
	}, [employees, ticket]);

	const getStatusTravelInfo = (request) => {

		const today = moment();
		const taskDate = moment(request.task_date, 'DD-MM-YYYY');

		switch (request.task_status) {
			case "Completed":
				return { text: "Complete", variant: "success" };

			case "Planned":
				if (taskDate.isBefore(today, 'day')) {
					return { text: "Pending", variant: "error" }
				} else {
					return { text: "Planned", variant: "info" }
				}
			// break; // no return here, just counters

			case "Not Planned":
				return { text: "Not Planned", variant: "warning" }
			// break;

			default:
				return { text: request.task_status, variant: "warning" };
		}

	}

	return (
		<Modal onClose={onClose}>
			<div style={{ padding: "0.8rem" }}>
				<h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Details</h2>
				<table style={{ width: "100%", borderCollapse: "collapse" }}>
					<tbody>
						<tr>
							<td><strong>Ticket Id:</strong></td>
							<td>{ticket.task_ref_id || "—"}</td>
						</tr>
						<tr>
							<td><strong>Customer Name:</strong></td>
							<td>{ticket.customer?.name || "—"}</td>
						</tr>
						<tr><td><strong>Status:</strong></td><td><Badge variant={getStatusTravelInfo(ticket).variant}>{getStatusTravelInfo(ticket).text}</Badge></td></tr>
						<tr><td><strong>Task Date:</strong></td><td>{ticket.task_date}</td></tr>
						{isTicket && <tr><td><strong>Category:</strong></td><td>{ticket.task_category_name}</td></tr>}
						{isTicket && <tr><td><strong>Sub Category:</strong></td><td>{ticket.task_sub_category_name}</td></tr>}
						<tr>
							<td><strong>Description:</strong></td>
							<td>{ticket.remarks || "—"}</td>
						</tr>
						<tr>
							<td><strong>Task Date:</strong></td>
							<td>{ticket.task_date || "—"}</td>
						</tr>
						<tr>
							<td><strong>Assigned Employee:</strong></td>
							<td>{ticket.emp_assigned || "—"}</td>
						</tr>

						{/* Status Row for Loading / Error / Employee */}
						{loading && (
							<tr>
								<td colSpan={2} style={{ textAlign: "center" }}>
									Loading ticket data...
								</td>
							</tr>
						)}

						{error && (
							<tr>
								<td colSpan={2} style={{ textAlign: "center", color: "red" }}>
									{error}
								</td>
							</tr>
						)}

						{!loading && !error && assignedEmployee ? (
							<tr>
								<td colSpan={2}>
									<div
										style={{
											marginTop: "1rem",
											border: "1px solid #ddd",
											padding: "1rem",
											borderRadius: "6px",
										}}
									>
										<h4 style={{ marginBottom: "0.5rem" }}>Employee Details</h4>
										<div
											style={{
												display: "flex",
												alignItems: "center",
												gap: "1rem",
											}}
										>
											<img
												src={assignedEmployee.image}
												alt={assignedEmployee.name}
												style={{
													width: "60px",
													height: "60px",
													borderRadius: "50%",
													objectFit: "cover",
												}}
											/>
											<div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
												<p><strong>Name:</strong> {assignedEmployee.name || '--'}</p>
												{/* <p><strong>Emp Id:</strong> {assignedEmployee.emp_id || "--"}</p> */}
												<p><strong>Mobile:</strong> {assignedEmployee.mobile_number || "--"}</p>
												<p><strong>Email:</strong> {assignedEmployee.email_id || "--"}</p>
												<p><strong>Department:</strong> {assignedEmployee.department_name || "--"}</p>
												{/* <p><strong>Grade:</strong> {assignedEmployee.grade_name || "--"}</p> */}
											</div>
										</div>
									</div>
								</td>
							</tr>
						): <tr>
								<td colSpan={2} style={{ textAlign: "center", color: "red" }}>
									Please assign a employee
								</td>
							</tr>
							}
					</tbody>
				</table>

				<div style={{ marginTop: "1.5rem", textAlign: "center" }}>
					<Button variant="primary" onClick={onClose}>
						Close
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export default FmsModal;

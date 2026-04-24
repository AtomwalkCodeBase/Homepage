import React from 'react'
import { useSearchParams } from "react-router-dom";
import Uscecaseheaders from './Uscecaseheaders'
import FeatureSection from './FeatureSection'

export default function Facilityusecase() {

    const [searchParams] = useSearchParams();
    const caseSlug = searchParams.get("case");
    const useCaseData = [
        {
            product: "fms",
            slug: "work-order-service-ticket-lifecycle",
            title: "Work Order & Service Ticket Lifecycle",
            subtitle: "Manage service requests from creation to closure with full visibility and control",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Workoder.png",
            descriptionsheader: "Streamline service operations with structured ticketing and lifecycle tracking",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Ticket.png",
                    text: "Centralized ticket creation and tracking",
                    desc: "Capture and manage all service requests with real-time tracking and status updates.",
                    bullets: [
                        "Create tickets for maintenance, complaints, or service requests",
                        "Track status from open to closure",
                        "Assign tickets to teams or individuals"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Workorder.png",
                    text: "End-to-end work order execution",
                    desc: "Convert tickets into actionable work orders with full lifecycle control.",
                    bullets: [
                        "Auto-generate work orders from service tickets",
                        "Track progress with real-time updates",
                        "Ensure closure with validation and proof of work"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "recurring-task-service-schedule-management",
            title: "Recurring Task & Service Schedule Management",
            subtitle: "Automate routine maintenance with intelligent scheduling",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/RecurringTask.png",
            descriptionsheader: "Ensure consistent service delivery with automated recurring task management",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/RecurringTasks.png",
                    text: "Automated recurring task scheduling",
                    desc: "Schedule routine tasks with flexible frequency and automation.",
                    bullets: [
                        "Daily, weekly, monthly scheduling",
                        "Auto-assign tasks to teams",
                        "Reduce manual intervention"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Calendar.png",
                    text: "Smart service planning and tracking",
                    desc: "Plan and track all recurring services with complete visibility.",
                    bullets: [
                        "Calendar-based task view",
                        "Track missed or delayed tasks",
                        "Ensure timely service execution"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "route-planning-field-workforce-scheduling",
            title: "Route Planning & Field Workforce Scheduling",
            subtitle: "Optimize field operations with smart routing and workforce allocation",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Route.png",
            descriptionsheader: "Improve field efficiency with optimized routes and scheduling",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/RecurringTasks.png",
                    text: "Optimized route planning",
                    desc: "Plan efficient routes for field teams to reduce travel time and increase productivity.",
                    bullets: [
                        "Auto-route planning for multiple locations",
                        "Reduce travel time and fuel cost",
                        "Location-based task allocation"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Scheduling.png",
                    text: "Workforce scheduling and allocation",
                    desc: "Assign the right workforce to the right job at the right time.",
                    bullets: [
                        "Schedule workers based on availability",
                        "Assign tasks by skill and priority",
                        "Balance workload across teams"
                    ]
                },

            ]
        },
        {
            product: "fms",
            slug: "waste-segregation-compliance-tracking",
            title: "Waste Segregation Compliance Tracking",
            subtitle: "Ensure proper waste handling with compliance monitoring and tracking",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Waste.png",
            descriptionsheader: "Track and enforce waste segregation practices across facilities",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Waste-Tracking.png",
                    text: "Waste segregation monitoring",
                    desc: "Track waste types and ensure proper segregation practices.",
                    bullets: [
                        "Categorize waste types (dry, wet, hazardous)",
                        "Track collection and disposal",
                        "Ensure compliance with regulations"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Compliance.png",
                    text: "Compliance and reporting",
                    desc: "Maintain records and generate reports for regulatory compliance.",
                    bullets: [
                        "Generate compliance reports",
                        "Track violations and corrective actions",
                        "Audit-ready documentation"
                    ]
                },

            ]
        },
        {
            product: "fms",
            slug: "asset-inspection-maintenance-workflows",
            title: "Asset Inspection & Maintenance Workflows",
            subtitle: "Ensure asset reliability with structured inspection and maintenance processes",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Asset.png",
            descriptionsheader: "Maintain assets efficiently with scheduled inspections and workflows",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Inspection.png",
                    text: "Scheduled asset inspections",
                    desc: "Plan and execute regular inspections to prevent failures.",
                    bullets: [
                        "Schedule periodic inspections",
                        "Checklist-based inspections",
                        "Capture issues with photos"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Maintenance.png",
                    text: "Maintenance workflow management",
                    desc: "Track maintenance activities from request to completion.",
                    bullets: [
                        "Create maintenance work orders",
                        "Track repair status",
                        "Maintain service history"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "contract-sla-monitoring-billing-automation",
            title: "Contract SLA Monitoring & Billing Automation",
            subtitle: "Ensure SLA compliance while automating billing processes",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-SLA.png",
            descriptionsheader: "Track service contracts with SLA monitoring and automated billing",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-SLA.png",
                    text: "SLA tracking and compliance",
                    desc: "Monitor service delivery against agreed SLAs.",
                    bullets: [
                        "Track response and resolution times",
                        "Identify SLA breaches",
                        "Generate SLA reports"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Billing.png",
                    text: "Automated billing and invoicing",
                    desc: "Generate invoices based on completed services and contracts.",
                    bullets: [
                        "Auto-generate invoices",
                        "Link billing to service completion",
                        "Reduce manual errors"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "job-costing-contract-profitability-visibility",
            title: "Job Costing & Contract Profitability Visibility",
            subtitle: "Track costs and measure profitability across all service contracts",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Costing.png",
            descriptionsheader: "Gain financial visibility into operations and contract performance",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Cost.png",
                    text: "Job-level cost tracking",
                    desc: "Track expenses associated with each job or service.",
                    bullets: [
                        "Monitor labor and material costs",
                        "Track cost per task or project",
                        "Identify cost overruns"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Profit.png",
                    text: "Contract profitability insights",
                    desc: "Analyze contract performance and profitability.",
                    bullets: [
                        "Compare revenue vs cost",
                        "Track profit margins",
                        "Optimize pricing strategies"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "environmental-performance-esg-analytics",
            title: "Environmental Performance & ESG Analytics",
            subtitle: "Monitor sustainability metrics and drive ESG compliance",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-ESG.png",
            descriptionsheader: "Track environmental impact and improve sustainability performance",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-ESG-Tracking.png",
                    text: "Environmental performance monitoring",
                    desc: "Track key environmental metrics across facilities.",
                    bullets: [
                        "Monitor energy and water usage",
                        "Track waste generation",
                        "Measure sustainability KPIs"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-ESG-Report.png",
                    text: "ESG reporting and insights",
                    desc: "Generate ESG reports for compliance and decision-making.",
                    bullets: [
                        "Automated ESG reports",
                        "Track compliance with regulations",
                        "Data-driven sustainability insights"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "iot-based-temperature-humidity-environment-monitoring",
            title: "IoT-Based Temperature / Humidity / Environment Monitoring",
            subtitle: "Monitor environmental conditions in real time with IoT integration",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-IoT.png",
            descriptionsheader: "Ensure optimal environmental conditions with real-time monitoring",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-IoT.png",
                    text: "Real-time environmental tracking",
                    desc: "Monitor temperature, humidity, and other parameters using IoT devices.",
                    bullets: [
                        "Live monitoring of environmental data",
                        "Set thresholds and alerts",
                        "Prevent equipment or storage issues"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Alerts.png",
                    text: "Alerts and compliance control",
                    desc: "Get alerts for deviations and maintain compliance.",
                    bullets: [
                        "Instant alerts for threshold breaches",
                        "Maintain compliance logs",
                        "Audit-ready reports"
                    ]
                }
            ]
        },
        {
            product: "fms",
            slug: "waste-inventory-storage-lifecycle",
            title: "Waste Inventory & Storage Lifecycle",
            subtitle: "Track waste storage, movement, and disposal with full lifecycle visibility",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Waste-Inventory.png",
            descriptionsheader: "Manage waste inventory efficiently from storage to disposal",
            descriptions: [
                {
                    // image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Waste-Inventory.png",
                    text: "Waste inventory tracking",
                    desc: "Track stored waste quantities and categories in real time.",
                    bullets: [
                        "Monitor waste levels and categories",
                        "Track storage locations",
                        "Avoid overflow or mismanagement"
                    ]
                },
                {
                    // image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/FMS-Waste-Lifecycle.png",
                    text: "Waste lifecycle management",
                    desc: "Manage waste from collection to final disposal.",
                    bullets: [
                        "Track waste movement and disposal",
                        "Maintain compliance records",
                        "Ensure safe and timely disposal"
                    ]
                }
            ]
        }

    ]

    // 🔍 find matching use case
    const selectedCase = useCaseData.find(
        (item) => item.slug === caseSlug
    );

    if (!selectedCase) {
        return <h2>Use case not found</h2>;
    }

    return (
        <div>
            {/* Header gets main info */}
            <Uscecaseheaders
                title={selectedCase.title}
                subtitle={selectedCase.subtitle}
                mainImage={selectedCase.mainImage}
                sub={"Facility Management"}
                link={"/facilitymanagement.html"}

            />

            {/* Feature section gets descriptions */}
            <FeatureSection
                descriptions={selectedCase.descriptions}
                header={selectedCase.descriptionsheader}
            />
        </div>
    )
}
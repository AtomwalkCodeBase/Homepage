import React from 'react'
import { useSearchParams } from "react-router-dom";
import Uscecaseheaders from './Uscecaseheaders'
import FeatureSection from './FeatureSection'

export default function Labusecases() {

    const [searchParams] = useSearchParams();
    const caseSlug = searchParams.get("case");

    const useCaseData = [
        {
            product: "lab",
            slug: "end-to-end-sample-lifecycle-management",
            title: "End-to-End Sample Lifecycle Management",
            subtitle: "From collection to final analysis and reporting.",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/samplework2.png",
            descriptionsheader: "Streamline your lab operations with comprehensive sample lifecycle management",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/samplelife.png",
                    text: "Streamlined sample tracking across every stage",
                    desc: "Effortlessly monitor and manage samples throughout their entire lifecycle with precision and clarity.",
                    bullets: [
                        "Real-time tracking",
                        "Unique sample id",
                        "Automated status updates to reduce manual errors"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/samplelife2.png",
                    text: "Centralized workflow and data management",
                    desc: "Bring all your sample data, processes, and workflows into one unified system for better efficiency and control.",
                    bullets: [
                        "Unified dashboard for sample status and history",
                        "Standardized workflows for consistent operations",
                        "Secure data storage with full audit trails"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "lab-operations-management",
            title: "Lab Operations Management",
            subtitle: "Streamline daily lab activities with centralized control and operational efficiency",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/LabOperations.png",
            descriptionsheader: "Optimize day-to-day lab operations with better visibility, coordination, and control",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/TAT2.png",
                    text: "Centralized lab workflow and task management",
                    desc: "Manage all lab activities from a single platform with clear task allocation and real-time tracking.",
                    bullets: [
                        "Assign and track tasks across lab teams and departments",
                        "Real-time visibility into ongoing and pending activities",
                        "Standardized workflows for consistent operations"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/equpmentemargency.png",
                    text: "Operational efficiency and resource coordination",
                    desc: "Improve lab productivity by optimizing resource usage, scheduling, and process coordination.",
                    bullets: [
                        "Efficient utilization of equipment and lab resources",
                        "Smart scheduling of tests and processes",
                        "Reduce delays with better coordination and planning"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "sla-turnaround-time-optimization",
            title: "SLA & Turnaround Time Optimization",
            subtitle: "Deliver faster results with precise SLA tracking and optimized workflows",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/SLA.png",
            descriptionsheader: "Optimize lab performance with real-time SLA monitoring and workflow automation",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/TAT.png",
                    text: "Real-time SLA monitoring and alerts",
                    desc: "Ensure timely processing of samples with real-time SLA tracking and proactive alerts to prevent delays.",
                    bullets: [
                        "Track turnaround time for every test and sample",
                        "Automated alerts for SLA breaches and delays",
                        "Priority-based processing for urgent samples"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/TAT2.png",
                    text: "Optimized workflows for faster processing",
                    desc: "Identify bottlenecks and optimize lab workflows to improve efficiency and reduce turnaround times.",
                    bullets: [
                        "Identify bottlenecks with performance insights",
                        "Automate task assignments and escalations",
                        "Improve lab efficiency with smart scheduling"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "intelligent-test-batching-throughput-optimization",
            title: "Intelligent Test Batching & Lab Throughput Optimization",
            subtitle: "Optimizes test batching with real-time reporting to improve lab throughput, efficiency, and turnaround times",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Batching.png",
            descriptionsheader: "Optimize sample processing with intelligent batching and real-time throughput insights",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/priority.png",
                    text: "Priority-based batching and smart scheduling",
                    desc: "Automatically organize and process samples based on priority, QC status, and planned schedules to ensure faster turnaround.",
                    bullets: [
                        "Filter and prioritize samples based on urgency and SLA",
                        "Plan sample processing after QC completion",
                        "System alerts for planned but unprocessed samples"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/inventory.png",
                    text: "Automated inventory allocation and batch execution",
                    desc: "Create batches for multiple samples and let the system handle inventory calculation and allocation in a single click.",
                    bullets: [
                        "Auto-calculation of required inventory for each batch",
                        "One-click inventory allocation and process completion",
                        "Reduce manual errors and improve lab throughput"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "compliance-audit-trail-regulatory-readiness",
            title: "Compliance, Audit Trail & Regulatory Readiness",
            subtitle: "Ensure full compliance with complete traceability, audit transparency, and regulatory confidence",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Audit.png",
            descriptionsheader: "Maintain regulatory compliance with secure audit trails and complete operational transparency",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/auditrecord.png",
                    text: "Complete audit trail and activity tracking",
                    desc: "Capture every action performed in the system with detailed logs to ensure full traceability and accountability.",
                    bullets: [
                        "Track every user action with timestamp and user details",
                        "Maintain complete history of sample and data changes",
                        "Ensure accountability with role-based activity logs"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/report.png",
                    text: "Regulatory compliance and data security",
                    desc: "Stay compliant with industry regulations through secure data handling, controlled access, and standardized processes.",
                    bullets: [
                        "Role-based access control for secure data management",
                        "Data integrity with controlled edits and approvals",
                        "Ready for audits with structured and exportable reports"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "laboratory-operations-analytics-forecasting",
            title: "Laboratory to Research analytics and insights",
            subtitle: "Make smarter decisions with real-time insights and predictive analytics",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/LaboratorytoResear.png",
            descriptionsheader: "Transform lab data into actionable insights for performance optimization and future planning",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/samplelife2.png",
                    text: "Real-time analytics and insights",
                    desc: "Gain complete visibility into lab operations with powerful dashboards and data-driven insights.",
                    bullets: [
                        "Experiment lifecycle management ",
                        " Research analytics insights",
                        " Centralized lab operations"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/inventoryforcast.png",
                    text: "Predictive forecasting and capacity planning",
                    desc: "Leverage historical data and trends to forecast demand and optimize lab resources effectively.",
                    bullets: [
                        "Experimental demand forecasting",
                        "Laboratory resource optimization",
                        "Equipment and capacity planning",
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "batch-traceability-data-integrity-management",
            title: "Batch Traceability & Data Integrity Management",
            subtitle: "Ensure complete batch visibility with accurate, secure, and reliable data control",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/BatchTrace.png",
            descriptionsheader: "Maintain full traceability and data integrity across every batch and process",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/inventory.png",
                    text: "Inventory Traceability & Data Integrity",
                    desc: "Ensures complete batch-level traceability with real-time visibility, maintaining accurate, compliant, and audit-ready inventory data across laboratory operations.",
                    bullets: [
                        "Batch-level traceability control",
                        "Real-time inventory visibility",
                        "Secure inventory data integrity "
                    ]
                },
                // {
                //     image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/logs.png",
                //     text: "Robust data integrity and validation controls",
                //     desc: "Ensure accuracy and consistency of data with strict validation, controlled edits, and secure data handling.",
                //     bullets: [
                //         "Prevent unauthorized changes with role-based controls",
                //         "Maintain data accuracy with validation rules and checks",
                //         "Full audit logs to ensure data reliability and compliance"
                //     ]
                // }
            ]
        },
        {
            product: "lab",
            slug: "gmp-workflows-release-testing",
            title: "GMP Workflows & Release Testing",
            subtitle: "Standardize quality processes with compliant workflows and controlled release management",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/GMP.png",
            descriptionsheader: "Ensure consistent quality and regulatory compliance with GMP-driven workflows and release control",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/samplelife.png",
                    text: "Standardized GMP workflow management",
                    desc: "Design and enforce GMP-compliant workflows to ensure every process follows predefined quality standards and approvals.",
                    bullets: [
                        "Predefined workflows aligned with GMP guidelines",
                        "Step-by-step process control with mandatory checkpoints",
                        "Role-based approvals and electronic sign-offs"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/qccheck.png",
                    text: "Controlled release testing and approval",
                    desc: "Manage release testing with strict validation, ensuring only approved and verified results move forward.",
                    bullets: [
                        "QC-driven testing before batch or sample release",
                        "Multi-level approval workflows for final release",
                        "Complete traceability of release decisions and records"
                    ]
                },

            ]
        },
        {
            product: "lab",
            slug: "study-driven-sample-tracking-sponsor-reporting",
            title: "Study-Driven Sample Tracking & Reporting",
            subtitle: "Manage study-based samples with complete visibility and real-time sponsor reporting",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Exportable.png",
            descriptionsheader: "Streamline clinical and research workflows with study-centric tracking and transparent reporting",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/protocal.png",
                    text: " Study-Driven Sample Tracking & Reporting",
                    desc: "Enables mapping and tracking of samples to specific studies, ensuring protocol-aligned workflows, full traceability, and compliant reporting across CRO operations.",
                    bullets: [
                        "Study-based sample mapping ",
                        "Protocol-driven tracking",
                        "End-to-end traceability"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/report.png",
                    text: "Real-Time Study Reporting & Insights",
                    desc: "Enables real-time reporting and visibility into clinical study data, supporting faster decisions, compliance, and seamless CRO operations.",
                    bullets: [
                        "Automated report generation for sponsors",
                        "Real-time visibility into study progress and results",
                        "Exportable reports for compliance and communication"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "glp-study-protocol-management",
            title: "GLP Study & Protocol Management",
            subtitle: "Ensure compliant study execution with structured protocols and controlled documentation",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/GLP.png",
            descriptionsheader: "Manage GLP studies with complete protocol control, documentation, and regulatory compliance",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/protocal.png",
                    text: "Structured protocol design and execution",
                    desc: "Create, manage, and enforce study protocols with predefined steps to ensure consistency and GLP compliance.",
                    bullets: [
                        "Define detailed study protocols with step-by-step workflows",
                        "Ensure controlled execution with mandatory checkpoints",
                        "Standardize processes across all studies"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/glp-documentation.png",
                    text: "Compliant documentation and study records",
                    desc: "Maintain complete and audit-ready documentation for all study activities, ensuring transparency and regulatory readiness.",
                    bullets: [
                        "Centralized storage of study data and documentation",
                        "Version control for protocols and study updates",
                        "Audit-ready records aligned with GLP standards"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "approved-vendor-lifecycle-management",
            title: "Vendor Lifecycle Management",
            subtitle: "Manages the complete vendor lifecycle from onboarding to performance monitoring, ensuring compliance, reliability, and efficient collaboration",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/Vendor.png",
            descriptionsheader: "Ensure reliable vendor management with structured workflows and lifecycle tracking.",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/vendordashboard.png",
                    text: "Structured vendor onboarding and approval",
                    desc: "Simplify vendor onboarding with workflows and approvals",
                    bullets: [
                        "Vendor onboarding management",
                        "Performance monitoring insights",
                        "Compliance and documentation control"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/venderassesment.png",
                    text: "Vendor lifecycle tracking and performance management",
                    desc: "Continuously monitor vendor performance, compliance status, and lifecycle stages for better decision-making.",
                    bullets: [
                        "Track vendor status from approval to renewal or deactivation",
                        "Monitor vendor performance and compliance history",
                        "Automated reminders for renewals and document expiry"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "vendor-audit-compliance-vacr-management",
            title: "Vendor Audit & Compliance (VACR) Management",
            subtitle: "Ensures structured vendor audits and compliance tracking, maintaining regulatory adherence, documentation control, and audit readiness. ",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/VendorAudit.png",
            descriptionsheader: "Maintain vendor quality with audits and corrective actions.",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/vscr.png",
                    text: "Comprehensive vendor audit management",
                    desc: "Plan, execute, and track vendor audits with complete visibility into findings and compliance status.",
                    bullets: [
                        "Vendor audit management",
                        "Compliance tracking system ",
                        "Audit-ready documentation"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/monitering.png",
                    text: "CAPA tracking and compliance enforcement",
                    desc: "Ensure closure of audit findings with structured corrective and preventive action (CAPA) workflows.",
                    bullets: [
                        "Track CAPA actions with assigned ownership and timelines",
                        "Monitor compliance status and closure progress",
                        "Ensure audit readiness with complete traceability"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "equipment-utilization-preventive-maintenance",
            title: "Equipment Utilization & Preventive Maintenance",
            subtitle: "AW360 EMS ensures timely calibration with proactive and predictive maintenance for reliable, compliant, and uninterrupted lab operations—so unexpected breakdowns don’t slow you down, with LIMS alerts for maintenance",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/EquipmentUtilizatio.png",
            descriptionsheader: "Maximize equipment uptime and reliability with proactive maintenance and real-time utilization insights",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/equpmentmantan.png",
                    text: "Proactive Maintenance",
                    desc: "Regular, planned maintenance to prevent failures and ensure smooth lab operations.",
                    bullets: [
                        "Preventive maintenance scheduling ",
                        "Downtime risk minimization",
                        "Enhanced equipment longevity & reliability"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/equpmentemargency.png",
                    text: "Emergency Maintenance",
                    desc: "Immediate response to unexpected breakdowns to quickly restore operations and minimize disruption.",
                    bullets: [
                        "Rapid issue response ",
                        "Breakdown repair management ",
                        "Operational continuity support"
                    ]
                }
            ]
        },
        {
            product: "lab",
            slug: "equipment-calibration-maintenance-calendar",
            title: "Equipment Calibration & Maintenance Calendar",
            subtitle: "A centralized calibration calendar designed for GLP, GMP, and CRO environments to ensure timely calibration, regulatory compliance, and audit readiness.",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/maincalender.png",
            descriptionsheader: "Ensure timely equipment calibration and maintenance with a centralized calendar for GLP, GMP, and CRO compliance",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/calender.png",
                    text: "Centralized Calibration Calendar",
                    desc: " A unified calendar to schedule and track all equipment calibration and maintenance activities, ensuring nothing is missed.",
                    bullets: [
                        "Calibration schedule management",
                        "Audit and compliance readiness",
                        "Accuracy and reliability assurance"
                    ]
                }
            ]
        }
    ];

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
            />

            {/* Feature section gets descriptions */}
            <FeatureSection
                descriptions={selectedCase.descriptions}
                header={selectedCase.descriptionsheader}
            />
        </div>
    )
}
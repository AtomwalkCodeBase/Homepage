import React from 'react'
import { useSearchParams } from "react-router-dom";
import Uscecaseheaders from './Uscecaseheaders'
import FeatureSection from './FeatureSection'

export default function Seafoodusecase() {

    const [searchParams] = useSearchParams();
    const caseSlug = searchParams.get("case");

    const useCaseData = [
        {
            "product": "Seafood 1",
            "slug": "catch-based-production-planning",
            "title": "Catch-based Production Planning",
            "subtitle": "Atomwalk Office ERP adapts to daily catch volumes, optimizing resources, reducing waste, and streamlining seafood processing",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/CatchProductionPlanning.png",
            "descriptionsheader": "Align production with real‑time catch data to maximize efficiency",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/DynamicScheduling.png",
                    "text": "Dynamic Scheduling",
                    "desc": "Intelligent production planning that continuously adapts to fluctuations in daily catch volumes and changing market demand.",
                    "bullets": [
                        "Seamless real-time catch data integration",
                        "Smart resource and workforce allocation",
                        "Minimized downtime and operational bottlenecks"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/WasteMinimization.png",
                    "text": "Waste Minimization",
                    "desc": "System-driven workflows that help seafood exporters monitor, control, and reduce wastage across the entire processing cycle.",
                    "bullets": [
                        "End-to-end batch tracking and traceability",
                        "Real-time visibility into yield and process losses",
                        "Inventory and cold storage optimization through data insights"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ProfitabilityEnhancement.png",
                    "text": "Profitability Enhancement",
                    "desc": "Data-driven production planning that balances cost efficiency with demand fulfillment to maximize overall profitability.",
                    "bullets": [
                        "Demand-based production alignment",
                        "Optimized cost and resource utilization",
                        "Higher order fulfillment accuracy and consistency"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 2",
            "slug": "yield-variance-wastage-control",
            "title": "Yield Variance & Wastage Control",
            "subtitle": "Atomwalk Office ERP helps exporters track yield deviations, control wastage, and ensure efficiency across processing stages",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/YieldVarianceWastageControl.png",
            "descriptionsheader": "Gain real‑time visibility into yield and waste to maximize profitability",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/YieldMonitoring.png",
                    "text": "Yield Monitoring",
                    "desc": "Track and analyze yield performance in real time to quickly identify deviations between expected and actual output.",
                    "bullets": [
                        "Automated yield variance tracking across batches",
                        "Batch-wise comparison of input vs output",
                        "Actionable insights to reduce yield deviations"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/WastageControl.png",
                    "text": "Wastage Control",
                    "desc": "Monitor and control losses of raw seafood and processed output across different stages such as cleaning, grading, and packaging.",
                    "bullets": [
                        "Stage-wise loss tracking throughout processing",
                        "Identification of high-wastage points in operations",
                        "Data-backed process improvements to reduce losses"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ProfitOptimization.png",
                    "text": "Profit Optimization",
                    "desc": "Improve margins by controlling yield variance and minimizing wastage through continuous performance tracking and insights.",
                    "bullets": [
                        "Better cost control through reduced wastage",
                        "Yield-based performance visibility for decision-making",
                        "Continuous monitoring for operational improvement"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 3",
            "slug": "cold-storage-shelf-life-optimization",
            "title": "Cold Storage & Shelf-Life Optimization",
            "subtitle": "Atomwalk Office ERP streamlines cold storage with tracking and expiry visibility, helping exporters cut spoilage and maintain quality",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ColdStorageShelfLife.png",
            "descriptionsheader": "Manage cold storage and track shelf life to improve inventory",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/StorageStructureManagement.png",
                    "text": "Storage Structure Management",
                    "desc": "Organize cold storage using defined locations such as zones, floors, shelves, and rows for better visibility and control.",
                    "bullets": [
                        "Location-wise inventory mapping (zone, floor, shelf, row)",
                        "Easy tracking of stock placement within cold storage",
                        "Improved space utilization and stock accessibility"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/BatchwiseShelfLifeTracking.png",
                    "text": "Batch-wise Shelf-Life Tracking",
                    "desc": "Maintain accurate expiry tracking at batch level to ensure timely usage and reduce the risk of spoilage.",
                    "bullets": [
                        "Batch-level expiry date management",
                        "Clear visibility of near-expiry stock",
                        "FIFO/FEFO-based inventory handling support"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/InventoryControl&LossReduction.png",
                    "text": "Inventory Control & Loss Reduction",
                    "desc": "Monitor stored inventory effectively to minimize losses caused by mismanagement, overstocking, or expired products.",
                    "bullets": [
                        "Reduced spoilage through better stock rotation",
                        "Improved stock accuracy across cold storage",
                        "Better decision-making with inventory insights"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 4",
            "slug": "export-batch-traceability",
            "title": "Export Batch Traceability",
            "subtitle": "Atomwalk Office ERP provides batch‑level traceability, letting seafood businesses track every lot across stages accurately",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ExportBatchTraceability.png",
            "descriptionsheader": "Track batches across stages with visibility, control, and export accuracy",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/BatchIdentification.png",
                    "text": "Batch Identification",
                    "desc": "Create and manage unique batch records linked with raw material, processing, and finished goods data.",
                    "bullets": [
                        "Unique batch code generation for every lot",
                        "Linking raw material batches to finished goods",
                        "Centralized batch data across all stages"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ProcessTraceability.png",
                    "text": "Process Traceability",
                    "desc": "Track movement and transformation of each batch across cleaning, grading, processing, and packing stages.",
                    "bullets": [
                        "Stage-wise batch tracking within production",
                        "Clear visibility of batch flow across operations",
                        "Accurate tracking of input to output conversion"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/DispatchTraceability.png",
                    "text": "Dispatch Traceability",
                    "desc": "Maintain traceability of finished goods batches during order allocation and export dispatch.",
                    "bullets": [
                        "Batch mapping to customer orders and shipments",
                        "Easy identification of dispatched batches",
                        "Quick access to batch history for reference"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 5",
            "slug": "multi-stage-processing-workflow-tracking",
            "title": "Multi-stage Processing Workflow Tracking",
            "subtitle": "Atomwalk Office ERP tracks seafood processing across stages, ensuring visibility, controlled workflows, and accurate batch progress",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/MultiStageWorkflowTracking.png",
            "descriptionsheader": "Track, control, and optimize each processing stage with full visibility and clarity",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/StagewiseTracking.png",
                    "text": "Stage-wise Tracking",
                    "desc": "Monitor each processing stage with clear visibility into batch movement and progress across the workflow.",
                    "bullets": [
                        "Real-time visibility of batch progress across stages",
                        "Manual stage transitions with controlled workflow movement",
                        "Easy identification of delays and bottlenecks"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/PerformanceOptimization.png",
                    "text": "Performance Optimization",
                    "desc": "Evaluate stage-wise performance and resource usage to improve operational efficiency and consistency.",
                    "bullets": [
                        "Stage-wise performance tracking",
                        "Insights into resource and process efficiency",
                        "Continuous monitoring for operational improvement"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 6",
            "slug": "demand-driven-production-scheduling",
            "title": "Demand-Driven Production Scheduling",
            "subtitle": "Atomwal Office ERP plans production by customer demand, aligning processes to prevent overproduction and ensure timely fulfillment",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/DemandDrivenScheduling.png",
            "descriptionsheader": "Plan production on demand to improve accuracy and ensure fulfillment",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/OrderbasedPlanning.png",
                    "text": "Order-based Planning",
                    "desc": "Create production plans directly linked to customer orders, ensuring processing is aligned with actual demand.",
                    "bullets": [
                        "Production planning based on confirmed sales orders",
                        "Clear visibility of order-wise production requirements",
                        "Reduced risk of unnecessary production"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ProductionSchedulingControl.png",
                    "text": "Production Scheduling Control",
                    "desc": "Manage and adjust production schedules based on order priorities and available resources.",
                    "bullets": [
                        "Schedule batches based on order deadlines",
                        "Prioritize urgent and high-value orders",
                        "Better coordination between planning and production teams"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/OrderFulfillmentEfficiency.png",
                    "text": "Order Fulfillment Efficiency",
                    "desc": "Ensure timely processing and dispatch by aligning production activities with delivery commitments.",
                    "bullets": [
                        "Improved on-time order fulfillment",
                        "Reduced delays due to better planning visibility",
                        "Better alignment between production and dispatch"
                    ]
                }
            ]
        },

        {
            product: "Seafood 7",
            slug: "container-dispatch-planning",
            title: "Container & Dispatch Planning",
            subtitle: "Atomwalk Office ERP streamlines container allocation and dispatch scheduling, ensuring efficient loads, timely shipments, and visibility.",
            mainImage: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ContainerDispatchPlanning.png",
            descriptionsheader: "Streamline container allocation and dispatch scheduling with visibility and control",
            descriptions: [
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/ContainerAllocation.png",
                    text: "Container Allocation",
                    desc: "Smart container planning based on product type, volume, and destination to maximize space efficiency.",
                    bullets: [
                        "Dynamic container load optimization",
                        "Product-specific packing configuration",
                        "Reduced freight cost per shipment"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/DispatchScheduling.png",
                    text: "Dispatch Scheduling",
                    desc: "Automated dispatch planning aligned with shipment timelines and port availability.",
                    bullets: [
                        "Real-time dispatch tracking",
                        "Integrated port and carrier coordination",
                        "On-time shipment assurance"
                    ]
                },
                {
                    image: "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/GlobalShipmentVisibility.png",
                    text: "Global Shipment Visibility",
                    desc: "Monitor container movement and delivery status through integrated GPS and ERP dashboards.",
                    bullets: [
                        "Live route tracking and ETA updates",
                        "Digital proof of dispatch and delivery",
                        "Enhanced transparency for export clients"
                    ]
                }
            ]
        },

        {
            "product": "Seafood 8",
            "slug": "quality-certification-compliance",
            "title": "Quality & Certification Compliance",
            "subtitle": "Office ERP records quality checks and certifications in one system, ensuring control, traceability, and audit readiness",
            "mainImage": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/QualityCertificationCompliance.png",
            "descriptionsheader": "Maintain quality records and certifications centrally for control and readiness.",
            "descriptions": [
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/QualityInspection.png",
                    "text": "Quality Inspection",
                    "desc": "Record and manage quality checks at different stages with proper documentation and proof for each batch.",
                    "bullets": [
                        "Batch-wise quality check recording",
                        "Upload product images as inspection proof",
                        "Maintain digital records for verification and audits"
                    ]
                },
                {
                    "image": "https://raw.githubusercontent.com/AtomwalkCodeBase/Blogs/main/Website-images/CertificationManagement.png",
                    "text": "Certification Management",
                    "desc": "Store and manage important certification documents such as ISO and other compliance records in a centralized system.",
                    "bullets": [
                        "Centralized storage of certification documents",
                        "Easy access to certificates when required",
                        "Organized documentation for audit readiness"
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
                sub={"Seafood Industry"}
                link={"/lms.html"}
            />

            {/* Feature section gets descriptions */}
            <FeatureSection
                descriptions={selectedCase.descriptions}
                header={selectedCase.descriptionsheader}
            />
        </div>
    )
}
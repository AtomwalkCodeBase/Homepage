// pages/NewsDetail.jsx
import React from "react";
import NewsHeader from "../components/NewsHeader";
import NewsContent from "../components/NewsContent";
const newsData = [
    {
        id: "1",
        title: "Smarter Instrument Maintenance for Modern Laboratories",
        subheading: "Moving beyond fixed schedules to intelligent, risk-based equipment management.",
        location: "Bangalore",
        date: "March 17, 2026",
        content: [
            `Laboratory equipment is central to ensuring accuracy, reliability, and compliance in every operation. Traditionally, maintenance and calibration are managed through fixed schedules, where instruments are serviced at predefined intervals regardless of how they are actually used. While this approach provides a basic level of control, it often fails to reflect the dynamic nature of real laboratory environments.`,

            `In practice, some instruments are heavily used across multiple studies, while others remain idle for extended periods. Treating all equipment with the same schedule leads to inefficiencies, either through unnecessary maintenance or increased risk of unexpected failures. This gap between scheduled processes and real usage is where laboratories face operational challenges.`,

            `Atomwalk LMS introduces a smarter, condition-based approach to instrument maintenance. Instead of relying only on time-based schedules, the system evaluates usage patterns, calibration history, maintenance records, and breakdown trends. This allows laboratories to understand the actual health of each instrument and prioritize actions based on risk.`,

            `By identifying high-risk equipment early, teams can take preventive action before issues escalate. Maintenance becomes more focused and efficient, reducing downtime and avoiding disruptions to ongoing work. At the same time, stable instruments continue operating without unnecessary intervention, improving overall resource utilization.`,

            `This approach transforms maintenance from a routine activity into an intelligent process. It ensures that equipment is maintained not just on time, but at the right time, improving performance, strengthening compliance, and enabling laboratories to operate with greater confidence and control.`
        ],
        // quote: {
        //     author: "Abhishek Malhotra",
        //     role: "Global Business Head – Network Services, Tech Mahindra",
        //     text: "As enterprises accelerate cloud adoption and embrace hybrid work, fragmented architectures have become a challenge. Our partnership delivers a unified SASE solution to solve this."
        // }
    },

    {
        id: "3",
        title: "Intelligent Healthcare Operations with Smart HMS",
        subheading: "Enhancing patient care and hospital efficiency through connected, AI-enabled workflows.",
        location: "Bangalore",
        date: "March 20, 2026",
        content: [
            "Hospitals operate in highly dynamic environments where efficiency, accuracy, and timely decision-making are critical. Managing patient records, appointments, diagnostics, billing, and resources across departments often involves multiple systems and manual coordination. This often leads to delays, inefficiencies, and limited visibility into overall operations.",
            "Atomwalk HMS brings all hospital operations into a single, unified platform, enabling seamless coordination across departments. From patient registration and appointment scheduling to diagnostics, billing, and pharmacy management, every process is connected and managed in real time. This integration reduces manual effort and ensures smoother patient flow across the system.",
            "The platform enhances operational efficiency by providing structured workflows and real-time visibility into hospital activities. Administrators can monitor resource utilization, track patient movement, and manage critical operations without relying on fragmented data. Intelligent insights further support better planning and quicker decision-making when needed.",
            "A key focus of the system is improving patient experience while maintaining compliance. With organized data management and streamlined processes, hospitals can reduce waiting times, improve service delivery, and ensure accurate record-keeping. At the same time, the system supports compliance-ready reporting, making it easier to meet regulatory requirements.",
            "By bringing together connected systems with practical intelligence, Atomwalk HMS transforms hospital operations into a more efficient and controlled environment. It enables healthcare providers to focus more on patient care while maintaining visibility, consistency, and reliability across the organization.",


        ],
        // quote: {
        //     author: "John Doe",
        //     role: "CEO",
        //     text: "Sample quote for another news."
        // }
    },
    {
        id: "2",
        title: "Digitizing Seafood Operations with End-to-End ERP",
        subheading: "Bringing traceability, quality control, and operational efficiency into a unified seafood management platform.",
        location: "Bangalore",
        date: "March 20, 2026",
        content: [
            "Seafood businesses operate in a highly dynamic and sensitive environment where quality, traceability, and timely execution are critical. From raw material procurement to final export, every stage requires careful coordination and strict compliance. However, many organizations still rely on disconnected systems and manual processes, leading to inefficiencies, lack of visibility, and increased operational risks.",
            "Atomwalk’s Seafood ERP solution addresses these challenges by providing a unified digital platform tailored specifically for seafood processing, trading, and export businesses. It connects procurement teams, quality controllers, warehouse staff, production units, and management into a single ecosystem, ensuring that every process is seamlessly integrated and monitored in real time.",
            "The system enables structured management of procurement, quality control, inventory, production, and sales operations. Raw material intake can be tracked from suppliers, quality checks can be performed and recorded systematically, and inventory can be managed with batch-level precision. Production workflows are streamlined from raw seafood to finished goods, while sales and export processes are handled with proper documentation and traceability.",
            "A key strength of the platform is its end-to-end traceability. Every product can be tracked across its lifecycle, from supplier sourcing to final delivery to customers. This not only strengthens compliance with regulatory requirements but also builds trust with buyers by ensuring transparency and accountability throughout the supply chain.",
            'By bringing all operations into a single system, Atomwalk Seafood ERP improves visibility, reduces manual effort, and enhances decision-making through real-time data. It empowers business owners to optimize costs, maintain consistent quality, and scale their operations with confidence in an increasingly competitive market.'
        ],

    },
    {
        id: "4",
        title: "Instant Report Drafting for Laboratories",
        subheading: "Turning laboratory data into structured insights without manual effort.",
        location: "Bangalore",
        date: "December 20, 2025",
        content: [
            "Laboratories generate large volumes of data across experiments, samples, and processes, but converting this data into meaningful insights often remains a manual and time-consuming task. Many teams still rely on spreadsheets and repetitive workflows to compile reports, which slows down decision-making and introduces inconsistencies.",
            "Atomwalk LMS simplifies this process by enabling instant report generation directly within the system. Users can define what they need, such as a study, parameter, or time range, and the system automatically retrieves and structures the relevant data. This eliminates the need for manual effort and significantly reduces reporting time.",
            "The system also enhances clarity by presenting data through visual formats such as graphs and charts. This makes it easier to identify trends, compare results, and understand patterns without additional analysis. Teams can quickly move from raw data to actionable insights.",
            "To ensure consistency, reusable report templates allow users to standardize frequently generated reports. These templates can be used across studies and teams, ensuring uniformity in structure and simplifying compliance and audit processes.",
            "By automating report generation and standardizing outputs, Atomwalk LMS enables faster, more reliable decision-making. It transforms reporting from a bottleneck into a seamless capability, helping laboratories unlock the full value of their data and operate with greater efficiency."
        ],
    },
];
const NewsDetail = () => {
    const query = window.location.search;
    const params = new URLSearchParams(query);
    const id = params.get("id");

    const news = newsData.find(item => item.id === id);

    if (!news) return <div>News not found</div>;

    return (
        <>
            <NewsHeader
                title={news.title}
                subheading={news.subheading}
            />

            <NewsContent
                location={news.location}
                date={news.date}
                content={news.content}
                quote={news.quote}
            />
        </>
    );
};

export default NewsDetail;
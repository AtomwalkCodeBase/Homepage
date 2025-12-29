import React, { useEffect, useMemo, useState } from 'react'
import { getActivityList, getGLPProjectList } from '../services/productServices';
import Layout from '../components/Layout';
import styled from 'styled-components';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { FaListUl, FaProjectDiagram, FaRegCheckCircle} from 'react-icons/fa';
import Card from '../components/Card';
import { useNavigate } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import { TbClockExclamation } from 'react-icons/tb';
import { PiWarningBold } from 'react-icons/pi';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing["2xl"]};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`
const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`
const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`

const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: white;
`

const LmsDashBoard = () => {
  const [activities, setActivities] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const [filterValue, setFilterValue] = useState({
    project_code: "", status: "", searchTerm: ""
  });
  const Navigate = useNavigate();

  useEffect(() => {
    fetchActivityDetails();
    fetchProjectList();
  }, [])

  const getUniqueValues = (data, key) => {
    if (!Array.isArray(data)) return [];
    return [...new Set(data.map(item => item[key]).filter(Boolean))];
  };


  const getStatusDisplay = (statusNum) => {
    switch (statusNum) {
      case "01":
        return {
          status_display: "IN PROGRESS",
          variant: "info" 
        };
      case "02":
        return {
          status_display: "OVER-DUE",
          variant: "error" 
        };
      case "03":
        return {
          status_display: "PLANNED",
          variant: "secondary"
        };
      case "04":
        return {
          status_display: "COMPLETED",
          variant: "success"
        };
      default:
        return {
          status_display: "Default",
          variant: "default"
        };
    }
  };


  const fetchActivityDetails = async () => {
    try {
      const res = await getActivityList();
      let fetchedActivities = res?.data?.a_list || [];
      // console.log(JSON.stringify(res.data))
      setActivities(fetchedActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const fetchProjectList = async () => {
    try {
      const res = await getGLPProjectList();
      let fetchedProjects = res?.data || [];
      // console.log(JSON.stringify(res.data))
      setAllProject(fetchedProjects);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  const userProject = mapProjectsWithActivities(allProject, activities);


  // console.log("userProject", userProject)

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValue(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const PROJECT_STATUS = {
    IN_PROGRESS: "01",
    OVER_DUE: "02",
    PLANNED: "03",
    COMPLETED: "04",
  };

  // const PROJECT_STATUS = {
  //   START: "01",
  //   IN_PROGRESS: "02",
  //   COMPLETED: "03",
  // };

  const getProjectCounts = (projects = []) => {
    return projects.reduce(
      (acc, project) => {
        acc.total += 1;

        switch (project.project_status) {
          case PROJECT_STATUS.PLANNED:
            acc.pending += 1;
            break;

          case PROJECT_STATUS.COMPLETED:
            acc.completed += 1;
            break;

          case PROJECT_STATUS.OVER_DUE:
            acc.overdue += 1;
            break;

          case PROJECT_STATUS.IN_PROGRESS:
            acc.inProgress += 1;
            break;

          default:
            acc.unknown += 1;
        }

        return acc;
      },
      {
        total: 0,
        pending: 0,
        completed: 0,
        overdue: 0,
        inProgress: 0,
        unknown: 0,
      }
    );
  };

  const projectCounts = useMemo(() => {
    return {
      totalActivities: activities.length,
      ...getProjectCounts(userProject)

    }
  }, [activities, userProject]);


  const filteredData = useMemo(() => {
    return userProject.filter(item => {
      const matchesStatus =
        !filterValue.status ||
        item.project_status?.toString() === filterValue.status;

      const matchesProject =
        !filterValue.project_code ||
        item.project_code === filterValue.project_code;

      const matchesSearch =
        !filterValue.searchTerm ||
        item.customer?.name?.toLowerCase().includes(filterValue.searchTerm.toLowerCase());

      return matchesStatus && matchesProject && matchesSearch;
    });
  }, [userProject, filterValue]);

  const statsData = [
    {
      id: 1,
      label: 'Total Activities',
      value: projectCounts.totalActivities,
      color: "primary",
      icon: <FaProjectDiagram />
    },
    {
      id: 2,
      label: 'Total Complete',
      value: projectCounts.completed,
      color: "success",
      icon: <FaRegCheckCircle />
    },
    {
      id: 3,
      label: 'Total Pending ',
      value: projectCounts.pending,
      color: "warning",
      icon: <TbClockExclamation />
    },
    {
      id: 3,
      label: 'Total Over due ',
      value: projectCounts.overdue,
      color: "error",
      icon: <PiWarningBold />
    },
  ];


  return (
    <Layout title="Activity Dashboard">
      <StatsGrid >
        {statsData.map((stat) => (
          <StatsCard icon={stat.icon} label={stat.label} value={stat.value} color={stat.color} />
        ))}
      </StatsGrid>

      <Card>
        <FilterContainer>
          <FilterSelect
            name="project_code"
            value={filterValue.project_code}
            onChange={handleFilterChange}
          >
            <option value="">All Project</option>
            {getUniqueValues(userProject, "project_code").map((code, index) => (
              <option key={index} value={code}>{code}</option>
            ))}
          </FilterSelect>

          <FilterSelect
            name="status"
            value={filterValue.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="01">IN PROGRESS</option>
            <option value="02">OVER-DUE</option>
            <option value="03">PLANNED</option>
            <option value="04">COMPLETED</option>
          </FilterSelect>
          {/* <Button variant="outline" size="sm" onClick={handleFilter}>
                <FaFilter /> Filter
              </Button> */}
        </FilterContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Activity Reference</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                {/* <th>Over Due Date</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((request) => {
                  const statusInfo = getStatusDisplay(request.project_status);
                  return (
                    <tr key={request.id}>
                      <td>{request.project_code}</td>
                      <td>
                        {/* <div style={{ display: "flex", alignItems: "center" }}> */}
                        {/* <span style={{ marginRight: "0.5rem" }}>{getRequestIcon(request.request_sub_type)}</span> */}
                        {request.project_type}
                        {/* </div> */}
                      </td>
                      <td>{request.start_date}</td>
                      <td>{request.end_date}</td>
                      <td>
                        <Badge variant={statusInfo.variant}>{statusInfo.status_display}</Badge>
                      </td>
                      <td>
                      <ActionButtons>
                        <Button variant="ghost" size="sm" title="View" onClick={() => Navigate(`/activityList/?project_code=${request.project_code}`)} >
                          <FaListUl /> View Activity
                        </Button>
                      </ActionButtons>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                    No project found for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TableContainer>
      </Card>
    </Layout>
  )
}

export default LmsDashBoard

export function mapProjectsWithActivities(projectList = [], activityList = []) {
  if (!Array.isArray(projectList) || !Array.isArray(activityList)) {
    console.error("Invalid input:", { projectList, activityList });
    return [];
  }

  //   console.log("mapProjectsWithActivities, projectList ",projectList,)
  //   console.log("mapProjectsWithActivities,  activityList", activityList)

  const activityMap = {};
  const refSet = new Set();

  activityList.forEach(activity => {
    const ref = activity?.ref_num?.trim();
    if (!ref) return;

    refSet.add(ref);

    if (!activityMap[ref]) {
      activityMap[ref] = [];
    }

    activityMap[ref].push(activity);
  });

  const result = projectList
    .filter(project => {
      const code = project?.project_code?.trim();
      return refSet.has(code);
    })
    .map(project => ({
      ...project,
      activity_list: activityMap[project.project_code.trim()]
    }));

  return result;
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";
const DashboardList = [
  {
    id: 1,
    text: "Total visit",
    amount: "240",
    icon: <FontAwesomeIcon icon={faArrowTrendUp} />,
    rate: "2.5%",
  },
  {
    id: 2,
    text: "Cancel Travel",
    amount: "15",
    icon: <FontAwesomeIcon icon={faArrowTrendDown} />,
    rate: "0.5%",
  },
  {
    id: 3,
    text: "In Queue",
    amount: "24",
    icon: <FontAwesomeIcon icon={faArrowTrendUp} />,
    rate: "1.6%",
  },
  {
    id: 4,
    text: "Interested Places",
    amount: "56",
    icon: <FontAwesomeIcon icon={faArrowTrendUp} />,
    rate: "0.6%",
  },
];

export default DashboardList;

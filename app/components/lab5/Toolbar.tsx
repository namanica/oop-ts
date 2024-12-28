import Icon, { BorderOutlined, LineOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { DotIcon } from "../../assets/icons/DotIcon";
import { EllipseIcon } from "../../assets/icons/EllipseIcon";
import { CubeIcon } from "@/app/assets/icons/CubeIcon";
import { ShareIcon } from "@/app/assets/icons/ShareIcon";

interface ToolbarProps {
  chosenItem: string;
  setChosenItem: (key: string) => void;
}

export const Toolbar = ({ chosenItem, setChosenItem }: ToolbarProps) => {
  const toolbarItems = [
    {
      key: "dot",
      icon: <Icon component={DotIcon} style={{ width: 12, height: 12 }} />,
      tooltipTitle: "Крапка",
    },
    {
      key: "line",
      icon: <LineOutlined style={{ fontSize: 20 }} />,
      tooltipTitle: "Лінія",
    },
    {
      key: "rectangle",
      icon: <BorderOutlined style={{ fontSize: 20 }} />,
      tooltipTitle: "Прямокутник",
    },
    {
      key: "ellipse",
      icon: <EllipseIcon style={{ width: 22, height: 20 }} />,
      tooltipTitle: "Еліпс",
    },
    {
      key: "dumbbell",
      icon: <ShareIcon style={{ width: 22, height: 20 }} />,
      tooltipTitle: "Лінія з кружечками",
    },
    {
      key: "cube",
      icon: <CubeIcon style={{ width: 22, height: 20 }} />,
      tooltipTitle: "Куб",
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        height: "40px",
        marginTop: 10,
        backgroundColor: "#e0edff",
        borderColor: "black",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 5,
      }}
    >
      {toolbarItems.map((item) => (
        <Tooltip key={item.key} placement="bottom" title={item.tooltipTitle}>
          <Button
            type={chosenItem === item.key ? "primary" : "text"}
            onClick={() => {
              setChosenItem(item.key);
            }}
          >
            {item.icon}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};

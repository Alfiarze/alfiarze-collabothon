import React, { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { Card,  IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import CardsList from "../components/widgets/CardsList";
import Contracts from "../components/widgets/ContractsWidget";
import Credit from "../components/widgets/Credit";
import ContractsEnding from "../components/widgets/ContractsEnding";
import RecentTransfersList from "../components/widgets/RecentTransfersList";
import LoyaltyProgram from "../components/widgets/LoyaltyPrograms";
import UpcomingPayment from "../components/widgets/UpcomingPayment";
import OtherAccounts from "../components/widgets/OtherAccounts";
import TopBar from "../components/TopBar";
import ReceiptWidget from "../components/widgets/ReceiptWidget";
// Define a mapping of widget IDs to their components
const widgetComponents: { [key: string]: React.ComponentType } = {
  a: CardsList,
  b: Contracts,
  c: Credit,
  d: ContractsEnding,
  e: RecentTransfersList,
  f: LoyaltyProgram,
  g: UpcomingPayment,
  h: OtherAccounts,
  i: ReceiptWidget
};

const originalItems = Object.keys(widgetComponents);

const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 2, y: 0, w: 1, h: 2 },
    { i: "d", x: 3, y: 0, w: 1, h: 2 },
    { i: "e", x: 4, y: 0, w: 1, h: 2 },
    { i: "f", x: 5, y: 0, w: 1, h: 2 },
    { i: "g", x: 6, y: 0, w: 1, h: 2 },
    { i: "h", x: 7, y: 0, w: 1, h: 2 },
    { i: "i", x: 8, y: 0, w: 1, h: 2 }
  ]
};

function Dashboard() {
  return (
    <SizeMe>
      {({ size }) => <Content size={size} />}
    </SizeMe>
  );
}

function Content({ size }: { size: { width: number | null } }) {
  const [items, setItems] = useState<string[]>(originalItems);
  const [layouts, setLayouts] = useState<any>(() => {
    const savedLayouts = getFromLS("layouts");
    console.log("Initial layouts from localStorage:", savedLayouts);
    return savedLayouts || initialLayouts;
  });

  useEffect(() => {
    console.log("Current layouts:", layouts);
  }, [layouts]);

  const onLayoutChange = (allLayouts: any) => {
    console.log("Layout changed. New layouts:", allLayouts);
    setLayouts(allLayouts);
    saveToLS("layouts", allLayouts);
  };

  // Remove this function as it's no longer needed
  // const onLayoutSave = () => {
  //   saveToLS("layouts", layouts);
  // };

  const onRemoveItem = (itemId: string) => {
    setItems(items.filter((i) => i !== itemId));
  };

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };


  return (
    <>
      <TopBar editMode={editMode} toggleEditMode={toggleEditMode} />
      {size.width && (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={150}
          width={size.width}
          onLayoutChange={onLayoutChange}
          isDraggable={editMode}
          isResizable={editMode}
        >
          {items.map((key) => (
            <div key={key} className="widget">
              <Widget
                editMode={editMode}
                id={key}
                onRemoveItem={onRemoveItem}
                component={widgetComponents[key]}
              />
            </div>
          ))}
        </ResponsiveGridLayout>
      )}
    </>
  );
}

interface WidgetProps {
  id: string;
  onRemoveItem: (itemId: string) => void;
  component: React.ComponentType;
}

const Widget: React.FC<WidgetProps & { editMode: boolean }> = ({ id, onRemoveItem, component: Component, editMode }) => {
  return (
    <Card>
      {editMode && (
        <IconButton aria-label="delete" onClick={() => onRemoveItem(id)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <Component />
    </Card>
  );
};

function getFromLS(key: string): any {
  let ls: { [key: string]: any } = {};
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8") || "{}") || {};
    } catch (e) {
      console.error("Error parsing localStorage:", e);
    }
  }
  return ls[key];
}

function saveToLS(key: string, value: any) {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

export default Dashboard;

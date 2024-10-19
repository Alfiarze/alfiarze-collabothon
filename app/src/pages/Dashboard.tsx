import React, { useState, useEffect } from "react";
import { Responsive as ResponsiveGridLayout, Layout } from "react-grid-layout";
import { SizeMe } from "react-sizeme";
import { Card,  IconButton, Box, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import TopBar from "../components/TopBar";

import CardsList from "../components/widgets/CardsList";
import Contracts from "../components/widgets/ContractsWidget";
import Credit from "../components/widgets/Credit";
import ContractsEnding from "../components/widgets/ContractsEnding";
import RecentTransfersList from "../components/widgets/RecentTransfersList";
import LoyaltyProgram from "../components/widgets/LoyaltyPrograms";
import UpcomingPayment from "../components/widgets/UpcomingPayment";
import OtherAccounts from "../components/widgets/OtherAccounts";
import ReceiptWidget from "../components/widgets/ReceiptWidget";
import ShowQRCode from "../components/widgets/ShowQRCode";
import ChatNav from "../components/widgets/ChatNav";
import BankBalance from "../components/widgets/BankBalance";
import CurrencyBar from "../components/widgets/CurrencyBar";

// Move this type definition to the top of the file, after the imports
type BreakpointLayouts = {
  [key in 'lg' | 'md' | 'sm' | 'xs']: Layout[];
};

// Define a mapping of widget IDs to their components
const widgetComponents: { [key: string]: React.ComponentType<any> } = {
  a: CardsList,
  b: Contracts,
  c: ContractsEnding,
  d: UpcomingPayment,
  e: Credit,
  f: RecentTransfersList,
  g: LoyaltyProgram,
  h: OtherAccounts,
  i: ReceiptWidget,
  j: ShowQRCode,
  k: BankBalance,
};

const originalItems = Object.keys(widgetComponents);

// At the top of the file, add this type definition
const initialLayouts: BreakpointLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 2, y: 0, w: 1, h: 2 },
    { i: "d", x: 3, y: 0, w: 1, h: 2 },
    { i: "e", x: 0, y: 2, w: 1, h: 2 },
    { i: "f", x: 1, y: 2, w: 1, h: 2 },
    { i: "g", x: 2, y: 2, w: 1, h: 2 },
    { i: "h", x: 3, y: 2, w: 1, h: 2 },
    { i: "i", x: 0, y: 4, w: 1, h: 2 },
    { i: "j", x: 1, y: 4, w: 1, h: 2 },
    { i: "k", x: 2, y: 4, w: 1, h: 2 }
  ],
  md: [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 2, y: 0, w: 1, h: 2 },
    { i: "d", x: 0, y: 2, w: 1, h: 2 },
    { i: "e", x: 1, y: 2, w: 1, h: 2 },
    { i: "f", x: 2, y: 2, w: 1, h: 2 },
    { i: "g", x: 0, y: 4, w: 1, h: 2 },
    { i: "h", x: 1, y: 4, w: 1, h: 2 },
    { i: "i", x: 2, y: 4, w: 1, h: 2 },
    { i: "j", x: 0, y: 6, w: 1, h: 2 },
    { i: "k", x: 1, y: 6, w: 1, h: 2 }
  ],
  sm: [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 1, y: 0, w: 1, h: 2 },
    { i: "c", x: 0, y: 2, w: 1, h: 2 },
    { i: "d", x: 1, y: 2, w: 1, h: 2 },
    { i: "e", x: 0, y: 4, w: 1, h: 2 },
    { i: "f", x: 1, y: 4, w: 1, h: 2 },
    { i: "g", x: 0, y: 6, w: 1, h: 2 },
    { i: "h", x: 1, y: 6, w: 1, h: 2 },
    { i: "i", x: 0, y: 8, w: 1, h: 2 },
    { i: "j", x: 1, y: 8, w: 1, h: 2 },
    { i: "k", x: 0, y: 10, w: 1, h: 2 }
  ],
  xs: [
    { i: "a", x: 0, y: 0, w: 1, h: 2 },
    { i: "b", x: 0, y: 2, w: 1, h: 2 },
    { i: "c", x: 0, y: 4, w: 1, h: 2 },
    { i: "d", x: 0, y: 6, w: 1, h: 2 },
    { i: "e", x: 0, y: 8, w: 1, h: 2 },
    { i: "f", x: 0, y: 10, w: 1, h: 2 },
    { i: "g", x: 0, y: 12, w: 1, h: 2 },
    { i: "h", x: 0, y: 14, w: 1, h: 2 },
    { i: "i", x: 0, y: 16, w: 1, h: 2 },
    { i: "j", x: 0, y: 18, w: 1, h: 2 },
    { i: "k", x: 0, y: 20, w: 1, h: 2 }
  ]
};

function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ p: isMobile ? 1 : 2 }}>
      <SizeMe>
        {({ size }) => <Content size={size} />}
      </SizeMe>
    </Box>
  );
}

function Content({ size }: { size: { width: number | null } }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const rowHeight = isMobile ? 200 : 150;

  const [items, setItems] = useState<string[]>(originalItems);
  const [layouts, setLayouts] = useState<BreakpointLayouts>(initialLayouts);
  const [currentBreakpoint, setCurrentBreakpoint] = useState<keyof BreakpointLayouts>("lg");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBreakpoint: keyof BreakpointLayouts = "lg";
      if (width < 480) newBreakpoint = "xs";
      else if (width < 768) newBreakpoint = "sm";
      else if (width < 996) newBreakpoint = "md";

      if (newBreakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
        setLayouts((prevLayouts) => ({
          ...prevLayouts,
          [newBreakpoint]: prevLayouts[newBreakpoint] || initialLayouts[newBreakpoint],
        }));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [currentBreakpoint]);

  // Move this function outside of Content for better performance
  // const onLayoutChange = useCallback((allLayouts: BreakpointLayouts) => {
  //   console.log("Layout changed. New layouts:", allLayouts);
  //   setLayouts(allLayouts);
  // }, []);

  const onRemoveItem = (itemId: string) => {
    setItems(items.filter((i) => i !== itemId));
  };

  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <CurrencyBar />
      <TopBar editMode={editMode} toggleEditMode={toggleEditMode} />
      <ChatNav />
      {size.width && (
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 4, md: 3, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={rowHeight}
          width={size.width}
          // onLayoutChange={onLayoutChange}
          onBreakpointChange={(newBreakpoint) => setCurrentBreakpoint(newBreakpoint as keyof BreakpointLayouts)}
          isDraggable={editMode}
          isResizable={editMode}
          compactType="vertical"
          preventCollision={true}
          margin={[16, 16]}
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

// Move this interface outside of the main component
interface WidgetProps {
  id: string;
  onRemoveItem: (itemId: string) => void;
  component: React.ComponentType;
  editMode: boolean;
}

const Widget: React.FC<WidgetProps> = ({ id, onRemoveItem, component: Component, editMode }) => {
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {editMode && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton aria-label="delete" onClick={() => onRemoveItem(id)} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Component />
      </Box>
    </Card>
  );
};

// Comment out or remove the getFromLS and saveToLS functions
// function getFromLS(key: string): any { ... }
// function saveToLS(key: string, value: any) { ... }

export default Dashboard;

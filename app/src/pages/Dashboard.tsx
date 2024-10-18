import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "./Widget";

const ResponsiveGridLayout = WidthProvider(Responsive);

const originalItems = ["a", "b", "c", "d"];

const initialLayouts = {
  lg: [
    { i: "a", x: 0, y: 0, w: 1, h: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4 },
    { i: "c", x: 4, y: 0, w: 1, h: 4 },
    { i: "d", x: 0, y: 4, w: 2, h: 4 },
  ],
};

function Content({ size }: { size: { width: number } }) {
  const [items, setItems] = useState(originalItems);
  const [layouts, setLayouts] = useState(() => {
    const savedLayouts = getFromLS("layouts");
    console.log("Initial layouts from localStorage:", savedLayouts);
    return savedLayouts || initialLayouts;
  });

  useEffect(() => {
    console.log("Current layouts:", layouts);
  }, [layouts]);

  const onLayoutChange = (currentLayout: any, allLayouts: typeof initialLayouts) => {
    console.log("Layout changed. New layouts:", allLayouts);
    setLayouts(allLayouts);
    saveToLS("layouts", allLayouts);
  };
  const onLayoutSave = () => {
    saveToLS("layouts", layouts);
  };
  const onRemoveItem = (itemId: string) => {
    setItems(items.filter((i) => i !== itemId));
  };
  const onAddItem = (itemId: string) => {
    setItems([...items, itemId]);
  };

  return (
    <>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={30}
        width={size.width}
      >
        {items.map((key) => (
          <div key={key}>
            <Widget id={key} onRemoveItem={onRemoveItem} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

function getFromLS(key: string) {
  if (typeof window === 'undefined') {
    console.log("getFromLS: Window is undefined");
    return null;
  }
  try {
    const ls = JSON.parse(localStorage.getItem("rgl-8") || '{}');
    console.log(`getFromLS: Retrieved ${key}`, ls[key]);
    return ls[key];
  } catch (e) {
    console.error("getFromLS: Error parsing localStorage", e);
    return null;
  }
}

function saveToLS(key: string, value: any): void {
  if (typeof window === 'undefined') {
    console.log("saveToLS: Window is undefined");
    return;
  }
  try {
    const rgl = JSON.parse(localStorage.getItem("rgl-8") || '{}');
    rgl[key] = value;
    localStorage.setItem("rgl-8", JSON.stringify(rgl));
    console.log(`saveToLS: Saved ${key}`, value);
  } catch (e) {
    console.error("saveToLS: Error saving to localStorage", e);
  }
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);
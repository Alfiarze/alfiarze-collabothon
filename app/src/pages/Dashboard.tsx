import React, { useState } from "react";
import { Responsive as ResponsiveGridLayout } from "react-grid-layout";
import { withSize } from "react-sizeme";
import Widget from "./Widget";

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
  const [layouts, setLayouts] = useState<typeof initialLayouts>(
    getFromLS("layouts") || initialLayouts
  );
  const onLayoutChange = (_: any, allLayouts: typeof initialLayouts) => {
    setLayouts(allLayouts);
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
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        width={size.width}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key) => (
          <div
            key={key}
            className="widget"
            data-grid={{ w: 3, h: 2, x: 0, y: Infinity }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}

export default withSize({ refreshMode: "debounce", refreshRate: 60 })(Content);

function getFromLS(key: string) {
  let ls: Record<string, any> = {};
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8") || '{}');
    } catch (e) {}
  }
  return ls[key];
}

function saveToLS(key: string, value: any): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

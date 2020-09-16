import React, { useEffect } from "react";

interface Props {
  title: string;
}

export const Page: React.FC<Props> = ({ title, children }) => {
  useEffect(() => {
    document.title = title.trim() ? `${title} · Isaac Zafuta` : "Isaac Zafuta";
  }, [title]);

  return <div>{children}</div>;
};

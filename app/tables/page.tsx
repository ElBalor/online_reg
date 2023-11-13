import * as React from "react";
import { DataTableDemo } from "@/app/payments/page";

const TablesPage: React.FC = () => {
  return (
    <div className="max-h-full max-w-29 bg-gradient-to-br from-gray-800 to-slate-600 table mt-9 rounded-3xl ">
      <div>
        <DataTableDemo />
      </div>
    </div>
  );
};

export default TablesPage;

import { useNavigate } from "react-router-dom";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { EmptyReportsList } from "../components/common/EmptyStates";

export function ReportList() {
  const navigate = useNavigate();

  return (
    <Card className="p-8 border-2 border-gray-200">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Reports</h1>
        <p className="text-sm text-gray-600">View and manage your saved market reports.</p>
      </div>
      <EmptyReportsList onCreateReport={() => navigate("/input")} />
      <div className="mt-6 flex justify-end">
        <Button variant="outline" onClick={() => navigate("/input")}
          className="border-gray-300">
          Create report
        </Button>
      </div>
    </Card>
  );
}

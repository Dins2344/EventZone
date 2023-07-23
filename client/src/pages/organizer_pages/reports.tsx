import {
  ChartComponent,
  LineChartComponent,
  PieChartComponent,
  DonutChartComponent,
} from "../../components/organizer_components/chartsComponents";

const Reports: React.FC = () => {
  return (
    <>
      <div className="min-h-screen px-4">
        <h2 className="text-xl md:text-4xl font-extrabold text-black mt-10">
          Reports
        </h2>
        <div className="flex flex-wrap mt-10 border shadow-md px-3 rounded-md">
          <div className="flex flex-col justify-center w-full py-4 mb-3">
            <h2 className="text-xl  font-extrabold text-black ">
              Sales Summary
            </h2>
            <p>An overview of all ticket sales,</p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center">
            <p>Monthly revenue</p>
            <ChartComponent />
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center mt-3 md:mt-0">
            <p>Tickets sold in a month</p>
            <LineChartComponent />
          </div>
        </div>

        <div className="flex flex-wrap mt-10 border shadow-md px-3 rounded-md">
          <div className="flex flex-col justify-center w-full py-4 mb-3">
            <h2 className="text-xl  font-extrabold text-black ">
              Sales by Ticket Type
            </h2>
            <p>An overview of all ticket sales by ticket type</p>
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center">
            <p className="mb-2">Ticket types sold</p>
            <PieChartComponent />
          </div>
          <div className="flex flex-col w-full md:w-1/2 items-center mt-3 md:mt-0">
            <p className="mb-2">Ticket sold by events</p>
            <DonutChartComponent />
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;

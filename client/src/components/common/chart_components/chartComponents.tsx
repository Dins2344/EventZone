import { useEffect, useState } from "react";
import { getMonthlySales, getMonthlyTicketSales, getMonthlyTicketTypeSales } from "../../../api/adminAuth/admin";
import Chart from "react-apexcharts";

type MonthlySales = {
  totalSales: number;
  month: string;
};

export const ChartComponent: React.FC = () => {
  const [monthlySales, setMonthlySales] = useState<MonthlySales[]>();
  useEffect(() => {
    fetchMonthlySales();
  }, []);
  const fetchMonthlySales = async () => {
    const data = await getMonthlySales();
    setMonthlySales(data?.data.data);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const allMonths = [
    "2023-01",
    "2023-02",
    "2023-03",
    "2023-04",
    "2023-05",
    "2023-06",
    "2023-07",
    "2023-08",
    "2023-09",
    "2023-10",
    "2023-11",
    "2023-12",
  ];

  const monthlySalesArray = allMonths.map((month) => {
    // Find the element in the output array corresponding to the current month
    const dataForMonth =
      monthlySales && monthlySales.find((item) => item.month === month);

    // If data for the current month exists, use its totalSales value, otherwise use 0
    return dataForMonth ? dataForMonth.totalSales : 0;
  });

  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "Revenue",
        data: monthlySalesArray,
      },
    ],
  };

  return (
    <>
      <div className="w-full">
        <Chart options={state.options} series={state.series} type="bar" />
      </div>
    </>
  );
};

type ticketSales = {
  totalTickets: number;
  month: string;
};

export const LineChartComponent: React.FC = () => {
  const [ticketSales, setTicketSales] = useState<ticketSales[]>();
  useEffect(() => {
    fetchMonthlyTicketSale();
  }, []);

  const fetchMonthlyTicketSale = async () => {
    const data = await getMonthlyTicketSales();
    setTicketSales(data?.data.data);
  };
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const allMonths = [
    "2023-01",
    "2023-02",
    "2023-03",
    "2023-04",
    "2023-05",
    "2023-06",
    "2023-07",
    "2023-08",
    "2023-09",
    "2023-10",
    "2023-11",
    "2023-12",
  ];

  const monthlyTicketSalesArray = allMonths.map((month) => {
    const dataForMonth =
      ticketSales && ticketSales.find((item) => item.month === month);

    return dataForMonth ? dataForMonth.totalTickets : 0;
  });
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: months,
      },
    },
    series: [
      {
        name: "Ticket sold",
        data: monthlyTicketSalesArray,
      },
    ],
  };
  return (
    <>
      <div className="w-full">
        <Chart options={state.options} series={state.series} type="line" />
      </div>
    </>
  );
};

type ticketTypeSales = {
  paymentType: string;
  totalTickets: number;
};

export const PieChartComponent: React.FC = () => {
  const [ticketTypeSold, setTicketTypeSold] = useState<ticketTypeSales[]>();

  useEffect(() => {
    fetchTicketSoldType();
  }, []);

  const fetchTicketSoldType = async () => {
    const data = await getMonthlyTicketTypeSales();
    setTicketTypeSold(data?.data.data);
  };
  const ticketTypes = ["free", "charged", "donation"];

  const monthlyTicketSoldArray = ticketTypes.map((type) => {
    const dataForMonth =
      ticketTypeSold &&
      ticketTypeSold.find((item) => item.paymentType === type);

    return dataForMonth ? dataForMonth.totalTickets : 0;
  });

  const state = {
    series: monthlyTicketSoldArray,
    chartOptions: {
      labels: ticketTypes,
    },
  };
  return (
    <>
      <div className="w-full h-auto">
        <Chart options={state.chartOptions} series={state.series} type="pie" />
      </div>
    </>
  );
};

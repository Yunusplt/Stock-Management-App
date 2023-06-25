import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";

import {
  TicketIcon,
  CurrencyDollarIcon,
  CashIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";


export default function KpiCards() {
  const { sales, purchases } = useSelector((state) => state.stock);
  console.log(sales);
  console.log(purchases);
  const totalSales = sales.reduce(
    (acc, item) => acc + Number(item.price_total),
    0
  );
  const totalPurchases = purchases.reduce(
    (acc, item) => acc + Number(item.price_total),
    0
  );
  const totalProfit = totalSales - totalPurchases;
  const categories = [
    {
      title: "Sales",
      metric: `€ ${totalSales}`,
      icon: TicketIcon,
      color: "indigo",
    },
    {
      title: "Purchases",
      metric: `€ ${totalPurchases}`,
      icon: CurrencyDollarIcon,
      color: "amber",
    },
    {
      title: "Profit",
      metric: `€ ${totalProfit}`,
      icon: CashIcon,
      color: "fuchsia",
    },
  ];

  return (
    <Grid
      numItemsSm={1}
      numItemsMd={2}
      numItemsLg={3}
      className="gap-6 w-11/12 mx-auto"
    >
      {categories.map((item) => (
        <Card
          key={item.title}
          decoration="top"
          className="min-w-4/12"
          decorationColor={item.color}
        >
          <Flex className="space-x-4 flex justify-evenly w-full">
            <Icon
              icon={item.icon}
              variant="light"
              size="xl"
              color={item.color}
              className=""
            />
            <div className="min-w-7/12">
              <Text className="xs:text-sm md:text-lg lg:text-2xl">
                {item.title}
              </Text>
              <Metric className="xs:text-sm md:text-lg xl:text-2xl">
                {item.metric}
              </Metric>
            </div>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
}

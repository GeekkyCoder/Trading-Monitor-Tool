export const topDealUsers = [
    {
      id: 1,
      img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
      username: "Elva McDonald",
      email: "elva@gmail.com",
      amount: "3.668",
    },
    {
      id: 2,
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Linnie Nelson",
      email: "linnie@gmail.com",
      amount: "3.256",
    },
    {
      id: 3,
      img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Brent Reeves",
      email: "brent@gmail.com",
      amount: "2.998",
    },
    {
      id: 4,
      img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Adeline Watson",
      email: "adeline@gmail.com",
      amount: "2.512",
    },
    {
      id: 5,
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Juan Harrington",
      email: "juan@gmail.com",
      amount: "2.134",
    },
    {
      id: 6,
      img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Augusta McGee",
      email: "augusta@gmail.com",
      amount: "1.932",
    },
    {
      id: 7,
      img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
      username: "Angel Thomas",
      email: "angel@gmail.com",
      amount: "1.560",
    },
  ];
  
  export const chartBoxUser = {
    color: "#8884d8",
    icon: "/userIcon.svg",
    title: "Total Users",
    number: "11.238",
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };
  
  export const chartBoxProduct = {
    color: "skyblue",
    icon: "/productIcon.svg",
    title: "Total Packages",
    number: "238",
    dataKey: "products",
    percentage: 21,
    chartData: [
      { name: "Sun", products: 400 },
      { name: "Mon", products: 600 },
      { name: "Tue", products: 500 },
      { name: "Wed", products: 700 },
      { name: "Thu", products: 400 },
      { name: "Fri", products: 500 },
      { name: "Sat", products: 450 },
    ],
  };
  export const chartBoxRevenue = {
    color: "teal",
    icon: "/revenueIcon.svg",
    title: "Total Revenue",
    number: "$56.432",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
      { name: "Sun", revenue: 400 },
      { name: "Mon", revenue: 600 },
      { name: "Tue", revenue: 500 },
      { name: "Wed", revenue: 700 },
      { name: "Thu", revenue: 400 },
      { name: "Fri", revenue: 500 },
      { name: "Sat", revenue: 450 },
    ],
  };
  export const chartBoxConversion = {
    color: "gold",
    icon: "/conversionIcon.svg",
    title: "Total Ratio",
    number: "2.6",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
      { name: "Sun", ratio: 400 },
      { name: "Mon", ratio: 600 },
      { name: "Tue", ratio: 500 },
      { name: "Wed", ratio: 700 },
      { name: "Thu", ratio: 400 },
      { name: "Fri", ratio: 500 },
      { name: "Sat", ratio: 450 },
    ],
  };
  
  export const barChartBoxRevenue = {
    title: "Profit Earned",
    color: "#8884d8",
    dataKey: "profit",
    chartData: [
      {
        name: "Sun",
        profit: 4000,
      },
      {
        name: "Mon",
        profit: 3000,
      },
      {
        name: "Tue",
        profit: 2000,
      },
      {
        name: "Wed",
        profit: 2780,
      },
      {
        name: "Thu",
        profit: 1890,
      },
      {
        name: "Fri",
        profit: 2390,
      },
      {
        name: "Sat",
        profit: 3490,
      },
    ],
  };
  
  export const PackagesData = [
    
    {
      package: "Monthly",
      offers: [
        {
          id: 1,
          name: "Lite",
          price: 1250,
          isActive: true,
          description:"great services with great staff and management",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: false,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: false,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 2,
          name: "Gold",
          price: 2500,
          isActive: true,
          description:"Nothing you can bet at",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: false,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: false,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 3,
          name: "Pro",
          price: 1250,
          description:"Make some amends today",
          isActive: true,
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: true,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: true,
            },
          ],
        },
      ],
    },
  
  
    {
      package: "Yearly",
      offers: [
        {
          id: 1,
          name: "Lite",
          price: 3000,
          isActive: true,
          description:"great services with great staff and management",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: false,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: false,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 2,
          name: "Gold",
          price: 5000,
          isActive: true,
          description:"Nothing you can bet at",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: false,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: false,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 3,
          name: "Pro",
          price: 9000,
          description:"Make some amends today",
          isActive: true,
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: true,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: true,
            },
          ],
        },
      ],
    },
  
    {
      package: "Quarterly",
      offers: [
        {
          id: 1,
          name: "Lite",
          price: 1500,
          isActive: true,
          description:"great services with great staff and management",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: false,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: false,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 2,
          name: "Gold",
          price: 2500,
          isActive: true,
          description:"Nothing you can bet at",
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: false,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: false,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: false,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: false,
            },
          ],
        },
        {
          id: 3,
          name: "Pro",
          price: 3000,
          description:"Make some amends today",
          isActive: true,
          features: [
            {
              id: 1,
              name: "email services",
              isActive: true,
            },
            {
              id: 2,
              name: "24 hours support",
              isActive: true,
            },
            {
              id: 3,
              name: "management tools",
              isActive: true,
            },
            {
              id: 4,
              name: "Theme And Customizations",
              isActive: false,
            },
            {
              id: 5,
              name: "Meethings and Schedules",
              isActive: true,
            },
            {
              id: 6,
              name: "Well Alignments and gatherings",
              isActive: true,
            },
            {
              id: 7,
              name: "Beatiful Lads",
              isActive: true,
            },
            {
              id: 8,
              name: "Packages and Perks",
              isActive: true,
            },
          ],
        },
      ],
    },
  ];
  
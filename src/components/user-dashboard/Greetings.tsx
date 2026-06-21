import { useLoaderData } from "react-router";

export default function Greetings() {
   const firstname = useLoaderData()?.userdata?.userdata?.fullName?.split(" ")[0] ?? "there";

  const hour = new Date().getHours();
  const randomnumber = Math.floor(Math.random() * 3);

  const morninggreetings = [
    `Rise and shine ${firstname} — let's get those clothes clean!`,
    `Good morning ${firstname}! Fresh day, fresh laundry`,
    `Your wardrobe called — it needs your attention ${firstname}`,
  ];
  const afternoongreet = [
    `The sun is high noon, perfect time to drop off that laundry ${firstname}`,
    `Midday check-in ${firstname} — don't let the pile grow any bigger`,
    `Still in yesterday's outfit ${firstname}? We can fix that.`,
  ];
  const eveninggreet = [
    `Winding down? Let us handle tomorrow's outfit ${firstname}`,
    `End your day clean ${firstname} — schedule a pickup tonight.`,
    `Tomorrow's you will thank you for doing laundry now.`,
  ];

  let greeting: string;
  if (hour < 12) greeting = morninggreetings[randomnumber];
  else if (hour < 17) greeting = afternoongreet[randomnumber];
  else greeting = eveninggreet[randomnumber];

  return <p>{greeting}</p>;
}

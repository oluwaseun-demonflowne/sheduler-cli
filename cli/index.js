import {
  intro,
  outro,
  confirm,
  select,
  spinner,
  isCancel,
  cancel,
  text,
} from "@clack/prompts";
import axios from "axios";
import { setTimeout as sleep } from "node:timers/promises";
import color from "picocolors";

export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function getEmail() {
  let email;
  while (true) {
    email = await text({
      message: "💌💌 What email address do you want to send email to?",
      placeholder: "johndoe@gmail.com",
    });

    if (isCancel(email)) {
      cancel("Operation cancelled");
      return null; // Return null or handle exit here
    }

    if (email && isValidEmail(email)) {
      break; // Exit the loop if a valid email is provided
    } else {
      console.log(`${color.red(`Please enter a valid email address.`)}`);
    }
  }
  return email;
}

async function main() {
  console.log();
  intro(color.inverse("Welcome to email automation"));

  const email = await getEmail();

  const sendingType = await select({
    message: "Choose time for the email to be sent",
    options: [
      { value: "morning", label: "Morning" },
      { value: "afternoon", label: "Afternoon" },
      { value: "evening", label: "Evening", hint: "Night" },
    ],
  });

  const s = spinner();

  s.start("sending email");

  const response = await axios.post("http://localhost:5000/register", {
    email: email, // Replace with actual email
    period: sendingType, // Replace with actual period
  });

  // const response = await axios.get(`http://localhost:5000/sendemail/${email}`);

  if (response.status === 200) {
    s.stop(color.bgGreen(color.white("email sent")));
  } else {
    s.stop(color.bgRed(color.white("problem occured please retry")));
  }

  // const shouldContinue = await confirm({
  //   message: "Do you want to continue?",
  // });

  // if (!shouldContinue || isCancel(shouldContinue)) {
  //   cancel("Operation cancelled");
  //   return process.exit(0);
  // }

  // http://localhost:5000/sendemail/khanroberts3@gmail.com

  if (isCancel(sendingType)) {
    cancel("Operation cancelled");
    return process.exit(0);
  }

  // const s = spinner();

  // await sleep(3000);

  outro("You're all set!");

  await sleep(1000);
}

main().catch(console.error);

import { getDictionary } from "../../../dictionaries";
import InstagramAutomationClient from "./instagram-client";

export default async function InstagramAutomationPage({
  params,
}: {
  params: { lang: string };
}) {
  const lang = await params.lang;
  const dictionary = await getDictionary(lang);

  return <InstagramAutomationClient params={params} dictionary={dictionary} />;
}

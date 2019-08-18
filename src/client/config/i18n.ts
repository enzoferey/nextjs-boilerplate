import englishMessages from "../../../lang/en.json";
import spanishMessages from "../../../lang/es.json";

export enum Languages {
  English = "en",
  Spanish = "es",
}

export const messages = {
  [Languages.English]: englishMessages,
  [Languages.Spanish]: spanishMessages,
};

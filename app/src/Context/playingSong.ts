import { createContext, Dispatch, SetStateAction } from "react";

interface PlayingSongContextProps {
  playingSongId: string;
  setPlayingSongId: Dispatch<SetStateAction<string>>;
}

export const playingSongContext = createContext<PlayingSongContextProps>({
  playingSongId: "",
  setPlayingSongId: () => {},
});

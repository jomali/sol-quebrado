import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled, useTheme } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";
import { useStory } from "../StoryProvider";

type StoryletProps = {
  children: React.ReactNode;
  options?: (context?: unknown) => React.ReactNode[];
};

const StoryletContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: theme.spacing(2, 0),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3, 0),
  },
}));

const Storylet = (props: StoryletProps) => {
  const { children, options = () => [] } = props;

  const story = useStory();
  const theme = useTheme();

  const currentOptions = options(story).filter((element) => Boolean(element));

  return (
    <StoryletContainer>
      <Box // Storylet contents
        sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Zoom // Storylet options
        in={Boolean(currentOptions.length)}
        style={{
          transitionDelay: `${theme.transitions.duration.standard * 1.8}`,
        }}>
        <Stack
          spacing={1}
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
          }}>
          {currentOptions.map((element, index) => (
            <React.Fragment key={`option-${index}`}>{element}</React.Fragment>
          ))}
        </Stack>
      </Zoom>
    </StoryletContainer>
  );
};

export default Storylet;

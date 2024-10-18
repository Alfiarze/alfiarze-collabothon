import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const Root = styled(Card)({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  });
  
  const Header = styled('div')({
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
  });
  
  const Spacer = styled('div')({
    flexGrow: 1
  });
  
  const Body = styled('div')({
    padding: "0.5rem",
    flexGrow: 1,
  });

const widgetNames = {
  a: "A",
  b: "B",
  c: "C",
  d: "D",
  e: "E"
};

export default function Widget({ id, onRemoveItem }: { id: string; onRemoveItem: (id: string) => void }) {
    return (
      <Root>
        <Header>
          <Typography variant="h6" gutterBottom>
            {widgetNames[id as keyof typeof widgetNames]}
          </Typography>
          <Spacer />
          <IconButton aria-label="delete" onClick={() => onRemoveItem(id)}>
          </IconButton>
        </Header>
        <Body />
      </Root>
    );
  }

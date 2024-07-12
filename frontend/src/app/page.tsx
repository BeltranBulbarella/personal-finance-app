import AuthCard from "@/app/components/common/Card/AuthCard";
import {Box} from "@mui/material";

export default function Page() {
  return (
      <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <AuthCard/>
      </Box>
  );
}

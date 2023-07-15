"use client";
import SearchInput from "./SearchInput";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { useRouter } from "next/navigation";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import { Menu as MenuIcon } from "@mui/icons-material";

export default function HeaderMenu() {
  const router = useRouter();
  const [genres, setGenres] = useState<Array<{ id: React.Key; name: string }>>([
    { id: 28, name: "Action" },
    { id: 12, name: "Adventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comedy" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 18, name: "Drama" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 36, name: "History" },
    { id: 27, name: "Horror" },
    { id: 10402, name: "Music" },
    { id: 9648, name: "Mystery" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 10770, name: "TV Movie" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 37, name: "Western" },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const openGenresList = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeGenresList = (genre: null | { id: React.Key; name: string }) => {
    if (!mobileOpen) setAnchorEl(null);
    else setMobileOpen(false);
    if (genre) router.push(`/genre/${genre.name}/${genre.id}`);
  };
  const drawer = (
    <List>
      <div className="p-2">
        <SearchInput />
      </div>
      <Divider />
      <ListItemText
        primary="Genres"
        primaryTypographyProps={{
          fontWeight: "bold",
          paddingLeft: "10px",
        }}
      />
      <Divider />
      {genres.map((genre) => (
        <ListItem key={genre.id} disablePadding>
          <ListItemButton dense>
            <ListItemText
              primary={genre.name}
              onClick={() => closeGenresList(genre)}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  const toggleGenresListMobile = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className="h-full">
      <Button
        id="basic-button"
        className="h-full text-base font-medium !hidden sm:!block"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openGenresList}
        sx={{
          color: "#ffffff",
        }}
      >
        Genres
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => closeGenresList(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        disableScrollLock
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {genres
          ? genres.map((genre) => (
              <MenuItem onClick={() => closeGenresList(genre)} key={genre.id}>
                {genre.name}
              </MenuItem>
            ))
          : null}
      </Menu>

      <Button
        className="h-full text-base font-medium !block sm:!hidden"
        onClick={toggleGenresListMobile}
        sx={{
          color: "#ffffff",
        }}
      >
        <MenuIcon />
      </Button>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={toggleGenresListMobile}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: "50vw" },
        }}
        disableScrollLock
      >
        {drawer}
      </Drawer>
    </div>
  );
}

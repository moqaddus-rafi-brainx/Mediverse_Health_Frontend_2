/* eslint-disable no-nested-ternary */
/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
function collapseItem(theme, ownerState) {
  const { palette, transitions, breakpoints, boxShadows, borders, functions } = theme;
  const { active, darkSidenav, sidenavColor, miniSidenav } = ownerState;

  const { dark, text, transparent, white } = palette;
  const { xxl } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  const getStyles = () => ({
    [breakpoints.between(1200, 1500)]: {
      padding: `${pxToRem(6)} ${pxToRem(8)}`,
    },
    [breakpoints.between(1500, 3160)]: {
      padding: `${pxToRem(10.8)} ${pxToRem(16)} ${pxToRem(10.8)} ${pxToRem(16)}`,
    },
  });

  return {
    background: active ? "#3B98D1" : transparent.main,
    color: () => {
      let result = text.main;

      if ((active && sidenavColor) || (active && darkSidenav) || darkSidenav) {
        result = white.main;
      } else if (active) {
        result = white.main;
      }

      return result;
    },
    display: miniSidenav ? "block" : "flex",
    alignItems: "center",
    width: "100%",
    ...getStyles(),
    margin: `0 ${pxToRem(8)}`,
    borderRadius: borderRadius.md,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
    boxShadow: active && darkSidenav ? xxl : "none",

    [breakpoints.up("xl")]: {
      boxShadow: () => {
        if (active) {
          return darkSidenav ? xxl : "none";
        }

        return "none";
      },
      transition: transitions.create("box-shadow", {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      }),
    },
  };
}

function collapseIconBox(theme, ownerState) {
  const { transitions, borders, functions, breakpoints } = theme;
  const { darkSidenav, sidenavColor, active } = ownerState;

  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    color: "inherit",
    [breakpoints.between(1200, 1500)]: {
      minWidth: pxToRem(16),
      minHeight: pxToRem(16),
    },
    [breakpoints.between(1500, 3160)]: {
      minWidth: pxToRem(32),
      minHeight: pxToRem(32),
    },
    borderRadius: borderRadius.md,
    display: "grid",
    placeItems: "center",
    transition: transitions.create("margin", {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    "& svg, svg g": {
      fill: "currentColor",
    },

    "& i": {
      color: active && (darkSidenav || sidenavColor) ? "inherit" : null,
    },
  };
}

const collapseIcon = ({ palette: { white, gradients } }, { active }) => ({
  color: active ? white.main : gradients.dark.state,
});

function collapseText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    color: "inherit",
    marginLeft: pxToRem(4),

    [breakpoints.up("xl")]: {
      opacity: miniSidenav ? 0 : 1,
      maxWidth: miniSidenav ? 0 : "100%",
      marginLeft: miniSidenav ? 0 : pxToRem(4),
      transition: transitions.create(["opacity", "margin"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "& span": {
      color: "inherit",
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      lineHeight: 0,
      [breakpoints.between(1200, 1500)]: {
        fontSize: size.xs,
      },
      [breakpoints.between(1500, 3160)]: {
        fontSize: size.sm,
      },
    },
  };
}

function collapseArrow(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { noCollapse, darkSidenav, miniSidenav, open } = ownerState;

  const { size } = typography;
  const { pxToRem } = functions;

  return {
    fontSize: `${size.md} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? "rotate(0)" : "rotate(-180deg)",
    color: "inherit",
    transition: transitions.create(["color", "transform", "opacity"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),

    [breakpoints.up("xl")]: {
      display:
        noCollapse || (darkSidenav && miniSidenav) || miniSidenav
          ? "none !important"
          : "block !important",
    },
  };
}

export { collapseItem, collapseIconBox, collapseIcon, collapseText, collapseArrow };

import { useEffect } from "react";

export const usePopover = (clickbox: string, popover: string) => {
  useEffect(() => {
    let stopPropagation = false;

    const onClose = () => {
      if (!stopPropagation) {
        document.body.removeEventListener("click", onClose);
        _popover && (_popover.style.visibility = "hidden");
      }
      stopPropagation = false;
    };

    const onPopover = () => {
      if (_popover && _popover.style.visibility !== "visible") {
        _popover && (_popover.style.visibility = "visible");
        document.body.addEventListener("click", onClose);
        stopPropagation = true;
      }
    };

    const _popover = document.getElementById(popover);
    const _clickbox = document.getElementById(clickbox);
    _clickbox?.addEventListener("click", onPopover);

    return () => {
      document.body.removeEventListener("click", onClose);
      _clickbox?.removeEventListener("click", onPopover);
    };
  }, [clickbox, popover]);

  return [clickbox, popover];
};

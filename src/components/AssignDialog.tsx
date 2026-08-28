import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiUserCheck } from "react-icons/fi";

import { roleLabel, type Category, type StaffMember } from "@/lib/types";

export function AssignDialog({
  open,
  staff,
  loading,
  category,
  onAssign,
  onCancel,
}: {
  open: boolean;
  staff: StaffMember[];
  loading?: boolean;
  /** Report category used to surface matching staff as suggestions. */
  category?: Category;
  onAssign: (staffId: string) => void;
  onCancel: () => void;
}) {
  const sortedStaff = useMemo(() => {
    if (!category) return staff;
    const isSuggested = (m: StaffMember) =>
      Array.isArray(m.categories) && m.categories.includes(category);
    return [...staff].sort((a, b) => Number(isSuggested(b)) - Number(isSuggested(a)));
  }, [staff, category]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] grid place-items-center bg-background/70 p-4 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-md rounded-2xl p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <FiUserCheck className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold">Assign issue</h3>
                <p className="text-sm text-muted-foreground">Select a staff member or admin</p>
              </div>
            </div>

            <ul className="mt-5 max-h-64 space-y-2 overflow-y-auto">
              {staff.length === 0 && (
                <li className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  No staff members found for this organization.
                </li>
              )}
              {sortedStaff.map((member) => {
                const suggested =
                  !!category &&
                  Array.isArray(member.categories) &&
                  member.categories.includes(category);
                return (
                  <li key={member.id}>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => onAssign(member.id)}
                      className="flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-60"
                    >
                      <span className="flex items-center gap-2 font-semibold">
                        {member.fullName ?? member.email}
                        {suggested && (
                          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                            Suggested
                          </span>
                        )}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {roleLabel(member.role)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onCancel}
                className="rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-secondary"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

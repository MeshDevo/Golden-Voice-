import { AuditAction, WorkStatus } from "@prisma/client";

/**
 * Selects an audit action from the status transition requested for a work.
 * A partial update without a status change remains a normal UPDATE.
 */
export function resolveWorkUpdateAuditAction(
  currentStatus: WorkStatus,
  requestedStatus?: WorkStatus
): AuditAction {
  const nextStatus = requestedStatus ?? currentStatus;

  if (currentStatus === WorkStatus.ARCHIVED && nextStatus !== WorkStatus.ARCHIVED) {
    return AuditAction.RESTORE;
  }

  if (currentStatus !== WorkStatus.ARCHIVED && nextStatus === WorkStatus.ARCHIVED) {
    return AuditAction.ARCHIVE;
  }

  if (currentStatus !== WorkStatus.PUBLISHED && nextStatus === WorkStatus.PUBLISHED) {
    return AuditAction.PUBLISH;
  }

  return AuditAction.UPDATE;
}

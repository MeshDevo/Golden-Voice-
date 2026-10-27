const assert = require("node:assert/strict");
const test = require("node:test");
const { AuditAction, WorkStatus } = require("@prisma/client");
const { resolveWorkUpdateAuditAction } = require("../dist/modules/works/services/workAuditAction.js");

test("publishing a draft records PUBLISH", () => {
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.DRAFT, WorkStatus.PUBLISHED),
    AuditAction.PUBLISH
  );
});

test("archiving a draft or published work records ARCHIVE", () => {
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.DRAFT, WorkStatus.ARCHIVED),
    AuditAction.ARCHIVE
  );
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.PUBLISHED, WorkStatus.ARCHIVED),
    AuditAction.ARCHIVE
  );
});

test("restoring an archived work records RESTORE", () => {
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.ARCHIVED, WorkStatus.DRAFT),
    AuditAction.RESTORE
  );
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.ARCHIVED, WorkStatus.PUBLISHED),
    AuditAction.RESTORE
  );
});

test("editing fields without a status transition records UPDATE", () => {
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.PUBLISHED, undefined),
    AuditAction.UPDATE
  );
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.PUBLISHED, WorkStatus.DRAFT),
    AuditAction.UPDATE
  );
  assert.equal(
    resolveWorkUpdateAuditAction(WorkStatus.DRAFT, WorkStatus.DRAFT),
    AuditAction.UPDATE
  );
});

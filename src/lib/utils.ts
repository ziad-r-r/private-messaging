export function orderedPair(a: string, b: string) {
  return a < b ? [a, b] : [b, a];
}

export function publicUser(
  user: {
    id: string;
    username: string;
    privateId: string;
    bio: string;
    avatarUrl: string | null;
    createdAt: Date;
    lastSeenAt: Date;
    status?: string;
  },
  opts?: { hidePhoto?: boolean; hideOnline?: boolean; hideLastSeen?: boolean }
) {
  const online = Date.now() - new Date(user.lastSeenAt).getTime() < 35_000;
  return {
    id: user.id,
    username: user.username,
    privateId: user.privateId,
    bio: user.bio,
    avatarUrl: opts?.hidePhoto ? null : user.avatarUrl,
    createdAt: user.createdAt,
    online: opts?.hideOnline ? null : online,
    lastSeenAt: opts?.hideLastSeen ? null : user.lastSeenAt,
    status: user.status
  };
}

export function snippet(type: string, body: string, deleted: boolean) {
  if (deleted) return "Message deleted";
  if (type === "image") return "Photo";
  if (type === "video") return "Video";
  if (type === "voice") return "Voice message";
  if (type === "file") return body || "File";
  return body;
}

export class SavedSecret {
  secret: string = '';
  expireAfterView: number = 0;
  expireAfter: number = 0;
}

export class EncryptedSecret {
  hash: string = '';
  secretText: string = '';
  createdAt: number = 0;
  expiresAt: number = 0;
  remainingViews: number = 0;
}

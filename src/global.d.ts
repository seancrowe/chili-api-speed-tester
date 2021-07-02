declare module "chiliconnector" {
  class ChiliConnector {
    constructor(url: string, options?: any);
    async getServerDateAsync(returnXML = false);
    async generateApiKeyAsync(
      environmentNameOrURL: string,
      userName: string,
      password: string,
      returnXML = false
    );
    async resourceGetTreeLevelAsync(
      apiKey,
      resourceName,
      parentFolder,
      numLevels,
      returnXML = false
    );
    async resourceItemGetXMLAsync(
      apiKey,
      resourceName,
      itemID,
      returnXML = true
    );
    async resourceItemCopyAsync(
      apiKey,
      resourceName,
      itemID,
      newName,
      folderPath,
      returnXML = false
    );
    async resourceItemDeleteAsync(
      apiKey,
      resourceName,
      itemID,
      returnXML = false
    );
    async documentGetHTMLEditorURLAsync(
      apiKey,
      itemID,
      workSpaceID,
      viewPrefsID,
      constraintsID,
      viewerOnly,
      forAnonymousUser,
      returnXML = false
    );
    async resourceItemMoveAsync(
      apiKey,
      resourceName,
      itemID,
      newName,
      newFolderPath,
      returnXML = false
    );
  }
}

declare module "durations" {
  function stopwatch(): Watch;
}

declare interface Watch {
  stop();
  start();
  reset();
  duration(): {
    format(): string;
    nanos(): number;
    micros(): number;
    millis(): number;
    seconds(): number;
    minutes(): number;
    hours(): number;
    days(): number;
  };
}

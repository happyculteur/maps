const dataSourceTransformer = (user: any) => {
  const information = {
    category: user.category,
    interest:
      user["individual-insterest-in-happyculteur"] ||
      user["beekeeper-interest-in-happyculteur"],
    level: user["individual-level"] || user["beekeeper-level"],
    location: user.address,
    name: user.name,
    uuid: user.uuid
  };
  const space = user["individual-space-has-space"]
    ? {
        description: user["individual-space-description"],
        location: user["individual-space-location"],
        size: user["individual-space-size"],
        type: user["individual-space-type"]
      }
    : undefined;
  const beekeeper =
    information.category === "Apiculteur"
      ? {
          hive: user["beekeeper-nest-number"],
          installation: user["beekeeper-installation-type-wished"],
          since: user["beekeeper-time"]
        }
      : undefined;
  const training =
    information.category === "Apiculteur"
      ? {
          isBilled: user["beekeeper-is-formation-billed"],
          location: user["beekeeper-formation-place"] || information.location,
          target: user["beekeeper-formation-audience"]
        }
      : undefined;

  return {
    beekeeper,
    information,
    space,
    training
  };
};

export default dataSourceTransformer;

export const getMaterialMasterDetails = (material='%',type='%',group='%') => {
    return `getMaterialMasterDetails?pmaterial=${material}&ptype=${type}&pgroup=${group}`;
  }
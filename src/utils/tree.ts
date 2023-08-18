export const makeTree=(data)=>{
const buildTree = (parentId) => (item) => {
    const children = data.filter((child) => child.parentId === item.id);
    return {
      ...item,
      ...(children.length > 0 && { children: children.map(buildTree(item.id)) }),
    };
  };
  
  const nestedData = {
    items: data.filter((item) => !item.parentId).map(buildTree(undefined)),
  };
  return nestedData;
}
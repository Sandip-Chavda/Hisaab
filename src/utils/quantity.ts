export function getQuantityLabel(quantity: number) {
  switch (quantity) {
    case 0:
      return "રજા";
    case 0.5:
      return "અડધો શેર";

    case 0.75:
      return "પોણો શેર";

    case 1:
      return "શેર";

    case 1.5:
      return "દોઢ શેર";

    case 2:
      return "બે શેર";

    default:
      return "";
  }
}

import { useEffect, useState } from "react";
import apis from "../config.json";
import { getEndpoints } from "../endpoints";
import { Environment } from "../types/env";

class Category {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static useCategories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
      fetch(getEndpoints().categories)
        .then((res) => res.json())
        .then((data) => setCategories(data));
    }, []);

    return categories;
  }
}

export { Category };

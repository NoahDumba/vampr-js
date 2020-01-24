class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  get numberOfOffspring() {
    return this.offspring.length;
  }
  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let vamps = 0;
    let currentVamp = this;
    while (currentVamp.creator) {
      currentVamp = currentVamp.creator;
      vamps++;
    }
    return vamps;
  }
  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return (this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal);
  }
  // Returns the closest common ancestor of two vampires.
  closestCommonAncestor(vampire) {
    if (this === vampire) {
      return this;
    }
    if (this.creator === null || vampire.creator === this) {
      return this;
    }
    if (vampire.creator === null || this.creator === vampire) {
      return vampire;
    }
      let vamp1 = this;
      let vamp2 = vampire;

      while (vamp1.creator !== vamp2.creator) {
        while (vamp1.numberOfVampiresFromOriginal !== vamp2.numberOfVampiresFromOriginal) { // replace these loops with isMoreSenior and make the function recursive

          if (vamp1.numberOfVampiresFromOriginal > vamp2.numberOfVampiresFromOriginal) {
            vamp1 = vamp1.creator;
          } else if (vamp1.numberOfVampiresFromOriginal < vamp2.numberOfVampiresFromOriginal) {
            vamp2 = vamp2.creator;
          }
        }

        if (vamp1.creator !== vamp2.creator && vamp1.numberOfVampiresFromOriginal === vamp2.numberOfVampiresFromOriginal) {
          vamp1 = vamp1.creator;
          vamp2 = vamp2.creator;
        }
      }
      return vamp1.creator;
  }
}

module.exports = Vampire;
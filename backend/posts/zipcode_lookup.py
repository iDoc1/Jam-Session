from pyzipcode import ZipCodeDatabase


class ZipCodeLookup:
    """
    Stores a zipcode and a reference to the ZipCodeDatabase and allows the client to
    perform lookup operations on that zipcode
    """

    def __init__(self, zipcode):
        self._zipcode_db = ZipCodeDatabase()
        self._zipcode = str(zipcode)

    def zipcode_exists(self):
        """
        Returns True if zipcode exists and False otherwise
        """
        if self._zipcode_db.get(self._zipcode) is not None:
            return True
        return False

    def get_zipcodes_in_radius(self, radius):
        """
        Takes a radius then returns a set of all zipcodes within that radius
        """
        zipcodes = [z.zip for z in self._zipcode_db.get_zipcodes_around_radius(self._zipcode, radius)]
        return set(zipcodes)

    def get_city(self):
        """
        Returns the city of the zipcode if the zipcode exists
        """
        if self.zipcode_exists():
            return self._zipcode_db[self._zipcode].city
        return None

    def get_state(self):
        """
        Returns the state of the zipcode if the zipcode exists
        """
        if self.zipcode_exists():
            return self._zipcode_db[self._zipcode].state
        return None

    def get_zipcode(self):
        return self._zipcode

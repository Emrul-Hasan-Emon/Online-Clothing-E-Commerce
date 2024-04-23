package database

type MapperStore interface {
	FetchAllProduct() error
}

type DatabaseMapper struct {
	store MapperStore
}

func CreateNewDatabaseMapper(dbMapper MapperStore) *DatabaseMapper {
	return &DatabaseMapper{
		store: dbMapper,
	}
}

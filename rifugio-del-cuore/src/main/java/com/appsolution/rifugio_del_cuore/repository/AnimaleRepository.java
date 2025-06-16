package com.appsolution.rifugio_del_cuore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.appsolution.rifugio_del_cuore.model.Animale;

public interface AnimaleRepository extends JpaRepository<Animale, Integer> {

    @Query("SELECT a FROM Animale a " +
           "WHERE (:nome = '' OR LOWER(a.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) " +
           "AND (:genere = '' OR LOWER(a.genere) = LOWER(:genere))" +
           "AND (:specie = '' OR LOWER(a.specie) = LOWER(:specie)) ")
    List<Animale> findByFiltri(
        @Param("nome") String nome, 
        @Param("genere") String genere,
        @Param("specie") String specie);
}

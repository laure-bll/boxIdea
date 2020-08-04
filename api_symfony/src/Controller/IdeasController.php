<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Faker;

class IdeasController extends AbstractController
{

    protected $ideas;
    /**
     * @Route("/api/ideas", name="ideas")
     */
    public function show()
    {
        $faker = Faker\Factory::create('fr_FR');

        for ($i = 0; $i < 50; $i++) {
         
            $ideas[$i] = [
                'id' => $i,
                'title' => $faker->sentence,
                'createdAt' => $faker->dateTimeBetween($startDate = '-6 months', $endDate = 'now', $timezone = "UTC"),
                'author'=> $faker->name,
                'score' => $faker->numberBetween($min = 0, $max = 50)
            ];
        }

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($ideas));
        
        return $response;
    }
}
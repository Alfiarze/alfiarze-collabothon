# Generated by Django 5.1.2 on 2024-10-18 23:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('commerzbank', '0010_recipe_recipeitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='LoanOffer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('loan_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=10)),
                ('period', models.IntegerField()),
                ('description', models.TextField()),
                ('type', models.CharField(max_length=100)),
            ],
        ),
    ]
